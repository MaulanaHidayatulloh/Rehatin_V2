import React from "react";
import "./recommendationEvent.css";

function RecommendationEvent() {
  return (
    <section className="recommendation-event">
      <h3 className="recommendationEvent-title">Recommendation Event</h3>

      <div className="recommendationEvent-card">
        <a href="/TheEliteShowcase">
          <img
            src="../src/assets/EventInformation/recommendation-showcase.png"
            alt="Pesta Bebas Berselancar"
            className="recommendationEvent-image"
          />
          <div className="recommendationEvent-details">
            <h4>The Elite Showcase</h4>
          </div>
        </a>
      </div>
    </section>
  );
}

export default RecommendationEvent;
