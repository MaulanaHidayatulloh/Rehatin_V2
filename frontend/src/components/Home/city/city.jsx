import React from "react";
import "./city.css";

function City() {
  return (
    <section className="menu">
      <div className="menu_title">
        <img src="../src/assets/Home/city/mdi_city.svg" alt="" />
        <h2>
          Silakan pilih pulau yang ingin Anda telusuri destinasi wisatanya
        </h2>
      </div>
      <div className="row">
        <a href="/Jawa" className="menu-card" id="jawa">
          <div className="menu_keterangan">
            <h3>Jawa</h3>
            <p>Pulau Jawa & Sekitarnya</p>
          </div>
        </a>
        <a href="/Sumatra" className="menu-card" id="sumatra">
          <div className="menu_keterangan">
            <h3>Sumatra</h3>
            <p>Pulau Sumatra & Sekitarnya</p>
          </div>
        </a>
        <a href="/Kalimantan" className="menu-card" id="kalimantan">
          <div className="menu_keterangan">
            <h3>Kalimantan</h3>
            <p>Kalimantan & Sekitarnya</p>
          </div>
        </a>
        <a href="/Sulawesi" className="menu-card" id="sulawesi">
          <div className="menu_keterangan">
            <h3>Sulawesi</h3>
            <p>Pulau Sulawesi & Sekitarnya</p>
          </div>
        </a>
        <a href="/Papua" className="menu-card" id="papua">
          <div className="menu_keterangan">
            <h3>Papua</h3>
            <p>Pulau Papua & Sekitarnya</p>
          </div>
        </a>
        <a href="/Bali" className="menu-card" id="bali">
          <div className="menu_keterangan">
            <h3>Bali</h3>
            <p>Bali, NTB, NTT, & Sekitarnya</p>
          </div>
        </a>
      </div>
    </section>
  );
}

export default City;
