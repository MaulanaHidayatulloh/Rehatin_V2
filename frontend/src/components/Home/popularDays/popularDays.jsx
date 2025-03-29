import React from "react";
import "./popularDays.css";
import { StarHalf, StarFill } from "react-bootstrap-icons";

const cityRecommendations = [
  {
    imgSrc: "../src/assets/Home/popular/ragunan.png",
    title: "Taman Margasatwa Ragunan",
    rating: 4.5,
    url: "/places/1",
    harga: "10.000",
    visit: "10.111",
    lokasi: "Jakarta",
  },
  {
    imgSrc: "../src/assets/Home/popular/pandora.png",
    title: "Pandora Experience",
    rating: 4.8,
    url: "#",
    harga: "30.000",
    visit: "9.259",
    lokasi: "Jakarta",
  },
  {
    imgSrc: "../src/assets/Home/popular/sun.png",
    title: "Sun date Moon",
    rating: 4.5,
    url: "#",
    harga: "100.000",
    visit: "8.059",
    lokasi: "Bandung",
  },
  {
    imgSrc: "../src/assets/Home/popular/traffique.png",
    title: "Traffique Coffee Cafe",
    rating: 4.6,
    url: "#",
    harga: "100.000",
    visit: "7.200",
    lokasi: "Jakarta",
  },
  {
    imgSrc: "../src/assets/Home/popular/museum_geologi.png",
    title: "Museum Geologi Bandung",
    rating: 4.5,
    url: "#",
    harga: "20.000",
    visit: "7.100",
    lokasi: "Bandung",
  },
  {
    imgSrc: "../src/assets/Home/popular/tanjakan13.png",
    title: "Tanjakan 13",
    rating: 4.7,
    url: "#",
    harga: "250.000",
    visit: "7.100",
    lokasi: "Jakarta",
  },
];

const popularDays = () => {
  const handleCardClick = (url) => {
    window.location.href = url;
  };

  return (
    <div className="popular-section">
      <div className="popular-title">
        <img src="../src/assets/Home/popular/popular-icon.svg" alt="" />
        <h2>What's popular these days?</h2>
      </div>

      <div className="popular-list">
        {cityRecommendations.map((rec, index) => (
          <div
            className="popular-card"
            key={index}
            onClick={() => handleCardClick(rec.url)}
            style={{ cursor: "pointer" }}
          >
            <div className="popularCard_title">
              <img src={rec.imgSrc} alt={rec.title} />
              <p>{rec.lokasi}</p>
            </div>
            <div className="popular-card-caption">
              <h3>{rec.title}</h3>
              <p>
                {Array.from({ length: Math.floor(rec.rating) }, (_, i) => (
                  <StarFill key={i} size={17} className="star-full" />
                ))}
                {rec.rating % 1 !== 0 && (
                  <StarHalf size={17} className="star-half" />
                )}
              </p>
              <p id="popular_harga">Perkiraan Harga : {rec.harga}</p>
              <p id="popular_visit">
                {rec.visit} people visited this place recently
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default popularDays;
