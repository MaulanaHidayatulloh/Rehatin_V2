import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  StarHalf,
  StarFill,
  HeartFill,
  GeoAltFill,
} from "react-bootstrap-icons";
import "./admin.css";

const Admin = () => {
  const [places, setPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    // Ambil data tempat
    axios
      .get("http://localhost:8000/adminPlace/")
      .then((response) => {
        const updatedPlaces = response.data.map((place) => {
          const words = place.deskripsi.split(" ");
          const shortenedDescription = words.slice(0, 10).join(" "); // Ambil 10 kata pertama
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
      stars.push(<StarFill key={i} size={20} className="star-full" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" size={20} className="star-half" />);
    }

    return stars;
  };

  const handleDelete = async (id_tempat) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus tempat ini?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/adminPlace/${id_tempat}`);
        setPlaces(places.filter((place) => place.id_tempat !== id_tempat));
      } catch (error) {
        console.error("Gagal menghapus tempat:", error);
      }
    }
  };

  return (
    <section className="admin">
      <div className="admin_container">
        <Link to={"/admin-tambahTempatWisata"} className="admin-tambah-tempat">
          +
        </Link>

        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="admin-list">
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
              <div className="admin-card" key={place.id_tempat}>
                {/* <Link to={`/places/${place.id_tempat}`} className="link_tempat"> */}
                <div className="link_tempat">
                  <div className="admin_gambar">
                    <img src={place.gambar_path} alt={place.nama_tempat} />
                  </div>
                  <div className="admin_keterangan">
                    <h2>{place.nama_tempat}</h2>
                    <div className="place_rating">
                      <p id="nilai_rating">{place.averageRating}</p>
                      <p>{renderRating(place.averageRating)}</p>
                    </div>
                    <p>
                      <GeoAltFill className="mapEvent" /> {place.lokasi}
                    </p>
                    <p className="admin_deskripsi">{place.deskripsi}...</p>
                    <p>
                      Perkiraan Harga : Rp{" "}
                      {Number(place.harga).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                <div className="admin_edithapus">
                  <Link to={`/edit-tempat/${place.id_tempat}`}>
                    <button>edit</button>
                  </Link>
                  <button onClick={() => handleDelete(place.id_tempat)}>
                    hapus
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Admin;
