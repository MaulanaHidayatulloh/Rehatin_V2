import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { StarHalf, StarFill, HeartFill } from "react-bootstrap-icons";
import { GeoAltFill } from "react-bootstrap-icons";
import "./place.css";
import FilterComponent from "./FilterComponent";

const Bandung = () => {
  const [places, setPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);

    axios
      .get("http://localhost:8000/bandung")
      .then((response) => {
        const updatedPlaces = response.data.map((place) => {
          const words = place.deskripsi.split(" ");
          const shortenedDescription = words.slice(0, 10).join(" "); // Mengambil 10 kata pertama
          return {
            ...place,
            deskripsi: shortenedDescription,
            averageRating: parseFloat(place.average_rating).toFixed(1),
          };
        });
        setPlaces(updatedPlaces);
      })
      .catch((err) => {
        console.error("Error fetching places:", err);
      });
  }, []);

  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarFill key={i} size={15} className="star-full" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" size={15} className="star-half" />);
    }

    return stars;
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  const handleLoveClick = (place) => {
    let updatedWishlist = [];
    if (wishlist.some((item) => item.id_tempat === place.id_tempat)) {
      updatedWishlist = wishlist.filter(
        (item) => item.id_tempat !== place.id_tempat
      );
    } else {
      updatedWishlist = [...wishlist, place];
    }
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <section className="place">
      <FilterComponent onRatingChange={handleRatingChange} />
      <div className="places_container">
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="places-list">
          {places
            .filter((place) => {
              const matchesSearchTerm = place.nama_tempat
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
              const matchesRating = selectedRating
                ? place.averageRating >= selectedRating - 1 &&
                  place.averageRating <= selectedRating
                : true;
              return matchesSearchTerm && matchesRating;
            })
            .map((place) => (
              <div className="place-card" key={place.id_tempat}>
                <Link to={`/places/${place.id_tempat}`} className="link_tempat">
                  <div className="place_gambar">
                    <img
                      src={`data:image/png;base64,${place.gambarBase64}`}
                      alt={place.nama_tempat}
                    />
                    <div
                      className="place_love"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLoveClick(place);
                      }}
                    >
                      <HeartFill
                        className={
                          wishlist.some(
                            (item) => item.id_tempat === place.id_tempat
                          )
                            ? "love-icon loved"
                            : "love-icon"
                        }
                      />
                    </div>
                  </div>
                  <div className="place_keterangan">
                    <h2>{place.nama_tempat}</h2>
                    <div className="place_rating">
                      <p id="nilai_rating">{place.averageRating}</p>
                      <p>{renderRating(place.averageRating)}</p>
                    </div>
                    <p>
                      <GeoAltFill className="mapEvent" /> {place.lokasi}
                    </p>
                    <p className="place_deskripsi">{place.deskripsi}...</p>
                  </div>
                  <div className="place_harga">
                    <p>Perkiraan Harga :</p>
                    <p id="nilai_harga">Rp {place.harga}</p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Bandung;
