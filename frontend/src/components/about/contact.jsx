import React from "react";
import { Link } from "react-router-dom";

function Kontak() {
  return (
    <section id="kontak">
      <h2 className="fw-bold">CALL OR VISIT</h2>
      <Link
        to={
          "https://www.google.co.id/maps/place/Celerates+(PT.+Mitra+Talenta+Grup)/@-6.2864157,106.8117544,20.5z/data=!4m6!3m5!1s0x2e69f193e3eb1e7b:0x1fe4b6cf213f08ba!8m2!3d-6.2864349!4d106.8117794!16s%2Fg%2F11g4c5zq7p?entry=ttu"
        }
      >
        <img src="../../../public/assets/images/About/celerates-lokasi.png" />
      </Link>
    </section>
  );
}

export default Kontak;
