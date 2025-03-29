import React from "react";
import "./city.css";

function City() {
  return (
    <section className="menu">
      <div className="menu_title">
        <img src="../src/assets/Home/city/mdi_city.svg" alt="" />
        <h2>Which city do you choose in Jabodetabek & Bandung</h2>
      </div>
      <div className="row">
        <a href="/Jakarta" className="menu-card" id="jakarta">
          <div className="menu_keterangan">
            <h3>Jakarta</h3>
            <p>12.051 accomodations</p>
          </div>
        </a>
        <a href="/Bogor" className="menu-card" id="bogor">
          <div className="menu_keterangan">
            <h3>Bogor</h3>
            <p>9.250 accomodations</p>
          </div>
        </a>
        <a href="/Depok" className="menu-card" id="depok">
          <div className="menu_keterangan">
            <h3>Depok</h3>
            <p>7.223 accomodations</p>
          </div>
        </a>
        <a href="/Tangerang" className="menu-card" id="tangerang">
          <div className="menu_keterangan">
            <h3>Tangerang</h3>
            <p>9.999 accomodations</p>
          </div>
        </a>
        <a href="/Bekasi" className="menu-card" id="bekasi">
          <div className="menu_keterangan">
            <h3>Bekasi</h3>
            <p>9.125 accomodations</p>
          </div>
        </a>
        <a href="/Bandung" className="menu-card" id="bandung">
          <div className="menu_keterangan">
            <h3>Bandung</h3>
            <p>10.001 accomodations</p>
          </div>
        </a>
      </div>
    </section>
  );
}

export default City;
