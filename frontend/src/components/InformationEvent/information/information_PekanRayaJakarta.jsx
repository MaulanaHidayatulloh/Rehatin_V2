import React from "react";
import "./information.css";
import { CalendarEvent, GeoAltFill } from "react-bootstrap-icons";

function Information() {
  return (
    <section>
      <div className="event-card">
        <div className="event-details">
          <img
            src="../src/assets/EventInformation/pekanraya.png"
            alt="Event"
            className="event-image"
          />
          <h2>Pekan Raya Jakarta</h2>
          <p>
            <CalendarEvent className="calendarEvent" /> 28 Juni 2024
          </p>
          <p>
            <GeoAltFill className="mapEvent" /> Jl. Benyamin Suaeb, RT.13/RW.7,
            Gn. Sahari Utara, Jakarta
          </p>
          <p>
            Pekan Raya Jakarta atau Jakarta Fair adalah acara pameran tahunan
            terbesar di Asia Tenggara. Walaupun dinamai "pekan", pameran ini
            biasanya berlangsung selama satu bulan penuh dari bulan Juni sampai
            bulan Juli untuk memperingati hari jadi kota Jakarta
          </p>
        </div>
      </div>
    </section>
  );
}

export default Information;
