import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./KategoriTempat.css";

const categoryMapping = {
  1: "Alam",
  2: "Budaya",
  3: "Kuliner",
  4: "Bermain",
};

const locationMapping = {
  1: "Jawa",
  2: "Sumatra",
  3: "Kalimantan",
  4: "Sulawesi",
  5: "Papua",
  6: "Bali",
};

function KategoriTempat() {
  const { categoryId, locationId } = useParams();
  const [places, setPlaces] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [activeLocation, setActiveLocation] = useState(locationId);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(
          locationId
            ? `http://localhost:8000/kategoritempat/category/${categoryId}/location/${locationId}`
            : `http://localhost:8000/kategoritempat/category/${categoryId}`
        );
        console.log(response.data);
        setPlaces(response.data);
        // Set judul kategori sesuai dengan kategori yang dipilih
        setCategoryTitle(categoryMapping[categoryId]);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, [categoryId, locationId]);

  useEffect(() => {
    setActiveLocation(locationId);
  }, [locationId]);

  return (
    <section>
      <div className="KategoriTempat-container">
        <h2>{categoryTitle}</h2>
        <div className="Kategorilocations-nav">
          {Object.keys(locationMapping).map((id) => (
            <Link
              to={`/category/${categoryId}/location/${id}`}
              key={`location-${id}`}
              className={`Kategorilocation-link ${
                activeLocation === id ? "active" : ""
              }`}
              onClick={() => setActiveLocation(id)}
            >
              {locationMapping[id]}
            </Link>
          ))}
        </div>
        <div className="Kategoriplaces-grid">
          {places.length > 0 ? (
            places.map((place) => {
              // gambar_path
              const gambar_path = `http://localhost:8000/uploads/${place.gambar_path}`;
              return (
                <Link
                  to={`/places/${place.id_tempat}`}
                  key={`place-${place.id_tempat}`}
                  className="Kategoriplace-card"
                >
                  <img src={gambar_path} alt={place.nama_tempat} />
                  <h3>{place.nama_tempat}</h3>
                </Link>
              );
            })
          ) : (
            <p>No places found.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default KategoriTempat;
