"use client";
import "@style/diary.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function diary() {

  const [getJudul, setGetJudul] = useState([]);
  const [getIsiDiary, setGetIsiDiary] = useState([]);
  const [getKoleksiData, setGetKoleksiData] = useState([]);
  

  const endpointAPI = "https://6555c60d84b36e3a431e4f3d.mockapi.io/diary";

  async function getDiary() {
    try {
      const res = await axios.get(endpointAPI);

      //ambil data
      const dataJSON = res.data;
      console.log("DATA DALAM", dataJSON);
      setGetKoleksiData(dataJSON);

      //ambil judul
      const judul = dataJSON.map((item) => item.judul);
      console.log("JUDUL DALAM", judul);
      setGetJudul(judul);

      //ambil isi_diary
      const isi_diary = dataJSON.map((item) => item.isi_diary);
      console.log("ISI DALAM", isi_diary);
      setGetIsiDiary(isi_diary);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const [postTulisJudul, setPostTulisJudul] = useState("");
  const [postTulisDiary, setPostTulisDiary] = useState("");
  async function postDiary() {
    const updatedDiary = [
      ...getKoleksiData,
      { judul: postTulisJudul, 
        isi_diary: postTulisDiary },
    ];

    console.log("PRINTING ISI UPDATED DIARY:\n", updatedDiary);
    setDiary(updatedDiary);
    setPostTulisJudul("");
    setPostTulisDiary("");

    try {
      const res = await axios.post(endpointAPI, {
        judul: postTulisJudul,
        isi_diary: postTulisDiary,
      });

      if (res.status >= 200 && res.status < 300) {
        console.log("POST response:", res.data);
        // Fetch updated data after posting
        getDiary();
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      alert("failed to POST APIE" + error);
    }
  }
  function handlerInputJudul(event) {
    // Prevent the browser from reloading the page
    event.preventDefault();
    setPostTulisJudul(event.target.value);
  }
  function handlerInputIsiDiary(event) {
    // Prevent the browser from reloading the page
    event.preventDefault();
    setPostTulisDiary(event.target.value);
  }

  function handlerSubmitDiary(event) {
    // Prevent the browser from reloading the page
    setDiary(postTulisJudul);
    console.log("isi diary:" + diary);
  }
  function handlerKeyEnter(e) {
    e.preventDefault;
    if (e.key === "Enter") {
      setPostTulisJudul(e.target.value);
      setDiary(postTulisJudul);
    }
  }

  useEffect(() => {
    getDiary();
  }, []);

  return (
    <div>
      {/* POST DIARY */}
      <div className="banner-container">
        <div className="cta-banner-wrapper">
          {/* Tombol CTA */}
          <input
            name="input-judul"
            type="text"
            placeholder="Tuliskan judulmu.."
            onChange={handlerInputJudul}
            onKeyDown={handlerKeyEnter}
            value={postTulisJudul}
          />
          <input
            name="input-diary"
            type="text"
            placeholder="Tuliskan diarymu.."
            onChange={handlerInputIsiDiary}
            onKeyDown={handlerKeyEnter}
            value={postTulisDiary}
          />
          {postTulisJudul && postTulisDiary ? (
            <div className="cta-button" onClick={postDiary}>
              <p>Submit Diary</p>
            </div>
          ) : (
            <div
              className="cta-button disabled"
              onClick={() => alert("Isi terlebih dahulu!")}
            >
              <p>Disabled</p>
            </div>
          )}
        </div>
      </div>

     {/* MAP LIST DIARY */}
      {getKoleksiData ? (
        getJudul.length > 0 ? (
          <ul>
            {getJudul.map((item, idx) => (
              <Link href={`/diary/${item}/${getIsiDiary[idx]}`}>
                <li key={idx}>
                  <div
                    className={`diary-container ${
                      idx === getJudul.length - 1 ? "last-item" : ""
                    }`}
                  >
                    <h1>{getJudul[idx]}</h1>
                    <p className="p-diary">{getIsiDiary[idx]}</p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          "API is loading"
        )
      ) : (
        "API-nya empty"
      )}
    </div>
  );
}
  

