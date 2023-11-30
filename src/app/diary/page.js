"use client";
import "@style/diary.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function diary() {
  const [judul, setJudul] = useState([]);
  const [isiDiary, setIsiDiary] = useState([]);

  const endpointAPI = "https://6555c60d84b36e3a431e4f3d.mockapi.io/diary";

  async function getDiary () {
    try{
        const res = await axios.get(endpointAPI)
        const data = res.data

        //ambil judul
        const judul = data.map((item)=>(item.judul))
        setJudul(judul)

        //ambil isi
        const isiDiary = data.map((item)=>(item.isi_diary))
        setIsiDiary(isiDiary)
    }
    catch(error) {
        console.log("error fetching data: ${error}")
    }
  }

  useEffect(() => {
    getDiary();
  }, []);

  
  return (
    <div>
      {judul.length > 0 ? (
        <ul>
          {judul.map((item, idx) => (
            <Link href={'/diary/${item}/${isiDiary[idx]}'}>
              <li key={idx}>
                <div className="diary-container">
                    <h1>{judul[idx]}</h1>
                    <p className="p-diary">{isiDiary[idx]}</p>
                </div>
              </li>
            </Link>

          ))}
        </ul>
      ) : (
        "API not loading"
      )}
    </div>
  );
}
