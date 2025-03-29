import React from "react";
import "./information.css";
import { CalendarEvent, GeoAltFill } from "react-bootstrap-icons";

function Information() {
  return (
    <section>
      <div className="event-card">
        <div className="event-details">
          <img
            src="../src/assets/EventInformation/jdmbandung.png"
            alt="Event"
            className="event-image"
          />
          <h2>JDM Fest Bandung</h2>
          <p>
            <CalendarEvent className="calendarEvent" /> 11 Mei 2024
          </p>
          <p>
            <GeoAltFill className="mapEvent" /> Bandung Convention Centre, Jl.
            Soekarno Hatta No.354, Bandung
          </p>
          <p>
            Ratusan mobil Jepang beragam merek dan tipe tumpah ruah di JDM Fest
            2024 yang digelar di Bandung Convention Center, Bandung, Jawa Barat.
            Digelar 1 hari full Sabtu 11 Mei 2024, buanyak mobil-mobil 'ghoib'
            yang keluar kandangnya.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Information;
