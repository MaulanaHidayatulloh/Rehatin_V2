import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HeartFill,
  StarHalf,
  StarFill,
  GeoAltFill,
} from "react-bootstrap-icons";
import "./wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  // Ambil wishlist dari backend
  useEffect(() => {
    fetch("http://localhost:8000/wishlist", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          alert("Anda harus login untuk melihat wishlist");
          return [];
        }
        return res.json();
      })
      .then((data) => {
        const formattedData = (data.wishlist || []).map((place) => ({
          ...place,
          averageRating: place.average_rating
            ? parseFloat(place.average_rating).toFixed(1)
            : "0.0",
        }));
        setWishlist(formattedData);
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

  const handleRemoveFromWishlist = (placeId) => {
    const confirmDelete = window.confirm(
      "Apakah kamu yakin ingin menghapus tempat ini dari wishlist?"
    );
    if (!confirmDelete) return;

    fetch("http://localhost:8000/wishlist", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ tempat_id: placeId }),
    })
      .then((res) => {
        if (res.ok) {
          setWishlist(wishlist.filter((place) => place.tempat_id !== placeId));
          window.location.reload();
        } else if (res.status === 401) {
          alert("Anda harus login terlebih dahulu");
        } else {
          alert("Gagal menghapus dari wishlist");
        }
      })
      .catch((err) => {
        console.error("Gagal hapus wishlist:", err);
      });
  };

  return (
    <section className="wishlist">
      <h1>My Wishlist</h1>
      <div className="wishlistPlaces-list">
        {wishlist.length === 0 ? (
          <p>No places in wishlist.</p>
        ) : (
          wishlist.map((place) => (
            <div className="wishlistPlace-card" key={place.id_tempat}>
              <Link to={`/places/${place.id_tempat}`} className="link_tempat">
                <div className="wishlistPlace_gambar">
                  <img
                    src={`http://localhost:8000/uploads/${place.gambar_path}`}
                    alt={place.nama_tempat}
                  />
                  <div
                    className="wishlistPlace_love"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveFromWishlist(place.id_tempat);
                    }}
                  >
                    <HeartFill className="wishlistPlacelove-icon loved" />
                  </div>
                </div>
                <div className="wishlistPlace_keterangan">
                  <h2>{place.nama_tempat}</h2>
                  <div className="wishlistPlace_rating">
                    <p id="nilai_rating" style={{ fontSize: "22px" }}>
                      {place.averageRating}
                    </p>
                    <p>{renderRating(place.averageRating)}</p>
                  </div>
                  <p>
                    <GeoAltFill className="mapEvent" /> {place.lokasi}
                  </p>
                  <p className="wishlistPlace_deskripsi">
                    {place.deskripsi.split(" ").slice(0, 10).join(" ") + "..."}
                  </p>
                </div>
                <div className="wishlistPlace_harga">
                  <p>Perkiraan Harga :</p>
                  <p id="nilai_harga">Rp {place.harga}</p>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Wishlist;
