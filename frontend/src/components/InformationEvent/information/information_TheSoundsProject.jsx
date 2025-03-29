import React from "react";
import "./information.css";
import { CalendarEvent, GeoAltFill } from "react-bootstrap-icons";

function Information() {
  return (
    <section>
      <div className="event-card">
        <div className="event-details">
          <img
            src="../src/assets/EventInformation/soundproject.png"
            alt="Event"
            className="event-image"
          />
          <h2>The Sounds Project</h2>
          <p>
            <CalendarEvent className="calendarEvent" /> 9 Agustus 2024
          </p>
          <p>
            <GeoAltFill className="mapEvent" /> Ecopark & Ecovention, Ancol,
            Jakarta Utara
          </p>
          <p>
            festival musik tahunan yang telah menjadi acara yang
            ditunggu-tunggu, sudah diumumkan. Festival ini akan kembali diadakan
            pada tanggal 9, 10, dan 11 Agustus 2024
          </p>
        </div>
      </div>
    </section>
  );
}

export default Information;
