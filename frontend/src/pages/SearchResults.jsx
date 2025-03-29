import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import {
  StarHalf,
  StarFill,
  HeartFill,
  GeoAltFill,
} from "react-bootstrap-icons";
import FilterComponent from "../components/Place/FilterComponent";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q") || "";

  const [places, setPlaces] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);

    const fetchPlaces = async () => {
      try {
        const cities = [
          "jakarta",
          "bogor",
          "depok",
          "tangerang",
          "bekasi",
          "bandung",
        ];
        let allPlaces = [];

        for (const city of cities) {
          const response = await axios.get(`http://localhost:8000/${city}`);
          allPlaces = [...allPlaces, ...response.data];
        }

        const updatedPlaces = allPlaces.map((place) => {
          const words = place.deskripsi.split(" ");
          const shortenedDescription = words.slice(0, 10).join(" ");
          return {
            ...place,
            deskripsi: shortenedDescription,
            averageRating: parseFloat(place.average_rating).toFixed(1),
          };
        });

        setPlaces(updatedPlaces);
      } catch (err) {
        console.error("Error fetching places:", err);
      }
    };

    fetchPlaces();
  }, [searchQuery]);

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
        <h2 style={{ marginBottom: "32px" }}>
          Hasil Pencarian : {searchQuery}
        </h2>
        <div className="places-list">
          {places
            .filter((place) =>
              searchQuery
                ? place.nama_tempat
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                : false
            )
            .filter((place) =>
              selectedRating
                ? place.averageRating >= selectedRating - 1 &&
                  place.averageRating <= selectedRating
                : true
            )
            .map((place) => (
              <div className="place-card" key={place.id_tempat}>
                <Link to={`/places/${place.id_tempat}`} className="link_tempat">
                  <div className="place_gambar">
                    <img src={place.gambar_path} alt={place.nama_tempat} />
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

export default SearchResults;
