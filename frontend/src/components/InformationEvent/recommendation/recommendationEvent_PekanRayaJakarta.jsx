import React from "react";
import "./recommendationEvent.css";

function RecommendationEvent() {
  return (
    <section className="recommendation-event">
      <h3 className="recommendationEvent-title">Recommendation Event</h3>

      <div className="recommendationEvent-card">
        <a href="/TheSoundsProject">
          <img
            src="../src/assets/EventInformation/soundrecommendation.png"
            alt="Pesta Bebas Berselancar"
            className="recommendationEvent-image"
          />
          <div className="recommendationEvent-details">
            <h4>The Sound Project</h4>
          </div>
        </a>
      </div>
    </section>
  );
}

export default RecommendationEvent;
