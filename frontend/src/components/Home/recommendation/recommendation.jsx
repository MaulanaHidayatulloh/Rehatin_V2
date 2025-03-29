import React, { useState } from "react";
import "./recommendation.css";
import { StarHalf, StarFill } from "react-bootstrap-icons";

const cityRecommendations = {
  Jakarta: [
    {
      imgSrc: "../src/assets/Home/recommended/HappyHouse.png",
      title: "Happy House",
      rating: 4.5,
      url: "/places/1",
      harga: "10.000",
    },
    {
      imgSrc: "../src/assets/Home/recommended/HappyHouse.png",
      title: "Happy House",
      rating: 4.5,
      url: "#",
      harga: "10.000",
    },
    {
      imgSrc: "../src/assets/Home/recommended/Tanamera.png",
      title: "Tanamera Coffee",
      rating: 5,
      url: "#",
      harga: "10.000",
    },
    {
      imgSrc: "../src/assets/Home/recommended/Tanamera.png",
      title: "Tanamera Coffee",
      rating: 4.5,
      url: "#",
      harga: "10.000",
    },
    {
      imgSrc: "../src/assets/Home/recommended/Djournal.png",
      title: "D'journal House",
      rating: 4.5,
      url: "#",
      harga: "10.000",
    },
    {
      imgSrc: "../src/assets/Home/recommended/ombe.png",
      title: "Ombe Coffee",
      rating: 5,
      url: "#",
      harga: "10.000",
    },
    {
      imgSrc: "../src/assets/Home/recommended/common.png",
      title: "Common Grounds",
      rating: 5,
      url: "#",
      harga: "10.000",
    },
  ],
  Bogor: [
    {
      imgSrc: "../src/assets/Home/recommended/BogorCafe1.png",
      title: "Bogor Cafe 1",
      rating: 4,
      url: "#",
      harga: "10.000",
    },
    {
      imgSrc: "../src/assets/Home/recommended/BogorCafe2.png",
      title: "Bogor Cafe 2",
      rating: 5,
      url: "#",
      harga: "10.000",
    },
    {
      imgSrc: "../src/assets/Home/recommended/BogorCafe3.png",
      title: "Bogor Cafe 3",
      rating: 4,
      url: "#",
      harga: "10.000",
    },
  ],
  Depok: [
    {
      imgSrc: "../src/assets/Home/recommended/DepokCafe1.png",
      title: "Depok Cafe 1",
      rating: 5,
      url: "#",
      harga: "10.000",
    },
    {
      imgSrc: "../src/assets/Home/recommended/DepokCafe2.png",
      title: "Depok Cafe 2",
      rating: 3,
      url: "#",
      harga: "10.000",
    },
    {
      imgSrc: "../src/assets/Home/recommended/DepokCafe3.png",
      title: "Depok Cafe 3",
      rating: 4,
      url: "#",
      harga: "10.000",
    },
  ],
  Tangerang: [
    {
      imgSrc: "../src/assets/Home/recommended/TangerangCafe1.png",
      title: "Tangerang Cafe 1",
      rating: 4,
      url: "#",
      harga: "10.000",
    },
    {
      imgSrc: "../src/assets/Home/recommended/TangerangCafe2.png",
      title: "Tangerang Cafe 2",
      rating: 5,
      url: "#",
      harga: "10.000",
    },
  ],
  Bekasi: [
    {
      imgSrc: "../src/assets/Home/recommended/BekasiCafe1.png",
      title: "Bekasi Cafe 1",
      rating: 4,
      url: "#",
      harga: "10.000",
    },
    {
      imgSrc: "../src/assets/Home/recommended/BekasiCafe2.png",
      title: "Bekasi Cafe 2",
      rating: 5,
      url: "#",
      harga: "10.000",
    },
  ],
  Bandung: [
    {
      imgSrc: "../src/assets/Home/recommended/BandungCafe1.png",
      title: "Bandung Cafe 1",
      rating: 5,
      url: "#",
      harga: "10.000",
    },
    {
      imgSrc: "../src/assets/Home/recommended/BandungCafe2.png",
      title: "Bandung Cafe 2",
      rating: 4,
      url: "#",
      harga: "10.000",
    },
    {
      imgSrc: "../src/assets/Home/recommended/BandungCafe3.png",
      title: "Bandung Cafe 3",
      rating: 5,
      url: "#",
      harga: "10.000",
    },
  ],
};

const Recommendation = () => {
  const [activeCity, setActiveCity] = useState("Jakarta");

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
        {Object.keys(cityRecommendations).map((city) => (
          <button
            key={city}
            className={`recommendation-tab ${
              activeCity === city ? "active" : ""
            }`}
            onClick={() => setActiveCity(city)}
          >
            {city}
          </button>
        ))}
      </div>
      <div className="recommendation-list">
        {cityRecommendations[activeCity].map((rec, index) => (
          <div
            className="recommendation-card"
            key={index}
            onClick={() => handleCardClick(rec.url)}
            style={{ cursor: "pointer" }}
          >
            <img src={rec.imgSrc} alt={rec.title} />
            <div className="recommendation-card-caption">
              <h3>{rec.title}</h3>
              <p>
                {Array.from({ length: Math.floor(rec.rating) }, (_, i) => (
                  <StarFill key={i} size={17} className="star-full" />
                ))}
                {rec.rating % 1 !== 0 && (
                  <StarHalf size={17} className="star-half" />
                )}
              </p>
              <p id="recommendation_harga">Perkiraan Harga : {rec.harga}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendation;
