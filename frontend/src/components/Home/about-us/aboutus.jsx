import React from "react";
import { useNavigate } from "react-router-dom";
import "./aboutus.css";

function AboutUs() {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate("/aboutUs");
  };

  return (
    <section className="home">
      <div className="home-img">
        <img src="../src/assets/Home/about-us.png" alt="" />
      </div>
      <div className="home-content">
        <h2>ABOUT US</h2>
        <h1>KAMI SIAP MEMBANTU ANDA MENEMUKAN TEMPAT WISATA YANG SERU</h1>
        <p>
          Rehatin adalah website pencarian tempat wisata, yang menyediakan
          rekomendasi tempat-tempat wisata yang bisa anda kunjungi bersama
          keluarga atau teman. Baik saat musim liburan tiba, di waktu luang,
          maupun ketika anda merasa lelah dan butuh rehat. Dengan koleksi
          informasi yang sangat lengkap, Rehatin membantu anda merencanakan
          petualangan yang sempurna dan menghadirkan pengalaman liburan yang tak
          terlupakan.
        </p>
        <button onClick={handleLearnMore}>Pelajari Lebih Lanjut</button>
      </div>
    </section>
  );
}

export default AboutUs;
