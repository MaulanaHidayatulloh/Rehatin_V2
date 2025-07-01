import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  StarHalf,
  StarFill,
  HeartFill,
  GeoAltFill,
} from "react-bootstrap-icons";
import "./place.css";
import FilterComponent from "./FilterComponent";

const Sulawesi = () => {
  const [places, setPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Ambil data tempat
    axios
      .get("http://localhost:8000/sulawesi")
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

    // Ambil wishlist dari backend
    axios
      .get("http://localhost:8000/wishlist", { withCredentials: true })
      .then((res) => {
        setWishlist(res.data.wishlist || []);
      })
      .catch((err) => {
        console.error("Gagal mengambil wishlist:", err);
      });
  }, []);

  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarFill key={i} size={20} className="star-full" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" size={20} className="star-half" />);
    }

    return stars;
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  const handleLoveClick = async (place) => {
    const isInWishlist = wishlist.some(
      (item) => item.id_tempat === place.id_tempat
    );
    let updatedWishlist;

    try {
      if (isInWishlist) {
        const confirmDelete = window.confirm(
          `Apakah kamu yakin ingin menghapus "${place.nama_tempat}" dari wishlist?`
        );
        if (!confirmDelete) return;

        await axios.delete("http://localhost:8000/wishlist", {
          data: { tempat_id: place.id_tempat },
          withCredentials: true,
        });
        updatedWishlist = wishlist.filter(
          (item) => item.id_tempat !== place.id_tempat
        );
      } else {
        await axios.post(
          "http://localhost:8000/wishlist",
          { tempat_id: place.id_tempat },
          { withCredentials: true }
        );
        updatedWishlist = [...wishlist, place];
      }
      setWishlist(updatedWishlist);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Silakan login terlebih dahulu untuk menambahkan ke wishlist.");
      } else {
        console.error("Gagal mengelola wishlist:", err);
        alert("Terjadi kesalahan.");
      }
    }
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
                    <p id="nilai_harga">
                      Rp {Number(place.harga).toLocaleString("id-ID")}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Sulawesi;
