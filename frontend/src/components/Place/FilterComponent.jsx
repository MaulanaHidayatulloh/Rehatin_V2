import React, { useState } from "react";
import "./filter.css";

const FilterComponent = ({ onRatingChange }) => {
  const [selectedRating, setSelectedRating] = useState(null);

  const cities = [
    { name: "Jakarta", url: "/Jakarta" },
    { name: "Bogor", url: "/Bogor" },
    { name: "Depok", url: "/Depok" },
    { name: "Tangerang", url: "/Tangerang" },
    { name: "Bekasi", url: "/Bekasi" },
    { name: "Bandung", url: "/Bandung" },
  ];

  const ratings = [5, 4, 3, 2, 1];

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    onRatingChange(rating);
  };

  return (
    <div className="filter-container">
      <div className="dropdown">
        <select
          defaultValue=""
          onChange={(e) => {
            const selectedCity = cities.find(
              (city) => city.name === e.target.value
            );
            if (selectedCity) {
              window.location.href = selectedCity.url;
            }
          }}
        >
          <option value="" disabled hidden>
            City
          </option>
          {cities.map((city, index) => (
            <option key={index} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      <div className="filters">
        <h4>Filters</h4>
        {ratings.map((rating, index) => (
          <label key={index} className="filter-option">
            <input
              type="radio"
              value={rating}
              checked={selectedRating === rating}
              onChange={() => handleRatingChange(rating)}
              className="radio-input"
            />
            <img />
            <span
              className={`radio-label ${
                selectedRating === rating ? "selected" : ""
              }`}
            >
              {[...Array(rating)].map((_, i) => (
                <span key={i} className="star">
                  &#9733;
                </span>
              ))}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;
