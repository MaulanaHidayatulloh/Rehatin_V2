import React from "react";
import "./information.css";
import { CalendarEvent, GeoAltFill } from "react-bootstrap-icons";

function Information() {
  return (
    <section>
      <div className="event-card">
        <div className="event-details">
          <img
            src="../src/assets/EventInformation/WakuWakuFestival.png"
            alt="Event"
            className="event-image"
          />
          <h2>Waku - Waku Festival</h2>
          <p>
            <CalendarEvent className="calendarEvent" /> 25 - 26 May 2024
          </p>
          <p>
            <GeoAltFill className="mapEvent" /> Smesco Exhibition Convention
            Hall
          </p>
          <p>
            Waku Waku Fest adalah bazaar bertemakan Jepang untuk para komunitas
            dan pecinta budaya Jepang. Sebuah tempat untuk berkumpul, belanja
            dan mengekspresikan hal-hal yang berbau Jepang!
          </p>
        </div>
      </div>
    </section>
  );
}

export default Information;
