import React, { useState, useEffect } from "react";
import "./recommendation.css";
import { StarHalf, StarFill } from "react-bootstrap-icons";

const cities = ["Jawa", "Sumatra", "Kalimantan", "Sulawesi", "Papua", "Bali"];

const Recommendation = () => {
  const [activeCity, setActiveCity] = useState("Jawa");
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/place/recommendation/${activeCity}`)
      .then((res) => res.json())
      .then((data) => setRecommendations(data))
      .catch((err) => console.error("Gagal fetch data:", err));
  }, [activeCity]);

  const handleCardClick = (url) => {
    window.location.href = url;
  };

  return (
    <div className="recommendation-section">
      <div className="recommendation-title">
        <img src="../src/assets/Home/recommended/mdi_favorite.svg" alt="" />
        <h2>Special recommended for you</h2>
      </div>

      <div className="recommendation-tabs">
        {cities.map((city) => (
          <button
            key={city}
            className={`recommendation-tab ${activeCity === city ? "active" : ""}`}
            onClick={() => setActiveCity(city)}
          >
            {city}
          </button>
        ))}
      </div>

      <div className="recommendation-list">
        {recommendations.map((rec, index) => (
          <div
            className="recommendation-card"
            key={index}
            onClick={() => handleCardClick(rec.url)}
            style={{ cursor: "pointer" }}
          >
            <div className="recommendation-gambar">
              <img src={rec.imgSrc} alt={rec.title} />
            </div>
            <div className="recommendation-card-caption">
              <h3>{rec.title}</h3>
              <div className="recommendation-rating">
                {" "}
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "orange",
                  }}
                >
                  {rec.rating}
                </p>
                <p>
                  {Array.from({ length: Math.floor(rec.rating) }, (_, i) => (
                    <StarFill key={i} size={20} className="star-full" />
                  ))}
                  {rec.rating % 1 !== 0 && (
                    <StarHalf size={20} className="star-half" />
                  )}
                </p>
              </div>
              <p id="recommendation_harga">Perkiraan Harga: {rec.harga}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendation;
