import React from "react";
import "./information.css";
import { CalendarEvent, GeoAltFill } from "react-bootstrap-icons";

function Information() {
  return (
    <section>
      <div className="event-card">
        <div className="event-details">
          <img
            src="../src/assets/EventInformation/PestaBebasBerselancar.png"
            alt="Event"
            className="event-image"
          />
          <h2>Pesta Bebas Berselancar</h2>
          <p>
            <CalendarEvent className="calendarEvent" /> 15 Juni 2024
          </p>
          <p>
            <GeoAltFill className="mapEvent" /> Stadion Pakansari, Bogor
          </p>
          <p>
            Pesta Bebas Berselancar atau PBB adalah festival musik tahunan di
            bilangan kota Bogor yang menampilkan penampilan multi genre di atas
            tiga panggung selama satu hari dengan total lebih dari 20 delegasi.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Information;
