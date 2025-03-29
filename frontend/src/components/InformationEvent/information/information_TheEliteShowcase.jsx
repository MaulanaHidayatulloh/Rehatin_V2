import React from "react";
import "./information.css";
import { CalendarEvent, GeoAltFill } from "react-bootstrap-icons";

function Information() {
  return (
    <section>
      <div className="event-card">
        <div className="event-details">
          <img
            src="../src/assets/EventInformation/The-Elite-Showcase.png"
            alt="Event"
            className="event-image"
          />
          <h2>The Elite Showcase</h2>
          <p>
            <CalendarEvent className="calendarEvent" /> 25 - 26 May 2024
          </p>
          <p>
            <GeoAltFill className="mapEvent" /> Smesco Exhibition Convention
            Hall
          </p>
          <p>
            Pameran yang digagas oleh The Elite Indonesia ini akan memamerkan
            keberagaman industri otomotif Indonesia dengan melibatkan 247 mobil,
            70 motor, dan menghadirkan 39 tenant yang akan menampilkan karyanya.
            Sebagai pembeda, showcase motor akan bergabung dengan showcase mobil
            sehingga menciptakan pengalaman yang lebih menyeluruh bagi
            pengunjung.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Information;
