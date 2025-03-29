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

  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
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

  const handleRemoveFromWishlist = (placeId) => {
    const updatedWishlist = wishlist.filter(
      (place) => place.id_tempat !== placeId
    );
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
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
                    src={`data:image/png;base64,${place.gambarBase64}`}
                    alt={place.nama_tempat}
                  />
                  <div
                    className="place_love"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveFromWishlist(place.id_tempat);
                    }}
                  >
                    <HeartFill className="love-icon loved" />
                  </div>
                </div>
                <div className="wishlistPlace_keterangan">
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
