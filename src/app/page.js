'use client'

import { useState } from 'react'
import Image from 'next/image'
import '@style/home.css'

export default function Home() {
  
  const [nama, setNama] = useState('Abdul Muqsit Fadil');
  const [isSimpan, setSimpan] = useState("");


  function handleChangeName(event) {
    setSimpan(event.target.value);
  }

  function handlerGantiNama() {
    if (isSimpan.trim() !== "") {
      setNama(isSimpan);
      setSimpan("");
    }
  }

  function pressEnter(event) {
    if (event.key === 'Enter') {
      handlerGantiNama();
    }
  }

  const isInputEmpty = isSimpan.trim() === "";



  return (
    <>
      <div className="banner-container">
        {/* Kartunya */}
        <div className="header-banner-wrapper">
          {/* Foto Profil dan Nama */}
          <div className="profile-header-banner">
            {/* Foto Profil*/}
            <Image
              src="/assets/chara.jpg"
              alt="Picture of the author"
              fill
              objectFit='contain'
            />
          </div>
          <div className="content-header-banner">
            {/* Nama dan Kawan2*/}
            <h1>{nama}</h1>
            <div className="bio-nim-header-banner">
            {/* NIM dan BIO*/}
            <p>D121211022</p>
            <p>Pemrograman Web</p>

            </div>
          </div>
        </div>
        <div className="cta-banner-wrapper">
          {/* Tombol CTA */}
          <div className="text-form">
                <input type="text" name="inputnama" value={isSimpan} onChange={handleChangeName} onKeyPress={pressEnter} />
          </div>
          <div
            className="cta-button"
            style={{ marginTop: "18px", backgroundColor: isInputEmpty ? "gray" : "blue", cursor: isInputEmpty ? "not-allowed" : "pointer" }}
            onClick={isInputEmpty ? null : handlerGantiNama}>
            <p style={{ color: isInputEmpty ? "white" : "black" }}>{isInputEmpty ? "DISABLED" : "Ganti Nama"}</p>
          </div>
        </div>
      </div>
    </>
  )
}
