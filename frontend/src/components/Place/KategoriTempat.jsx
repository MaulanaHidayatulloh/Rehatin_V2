import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./KategoriTempat.css";

const categoryMapping = {
  1: "Park",
  2: "Museum",
  3: "Eatery",
  4: "Playground",
};

const locationMapping = {
  1: "Jakarta",
  2: "Bogor",
  3: "Depok",
  4: "Tangerang",
  5: "Bekasi",
  6: "Bandung",
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
            ? `http://localhost:8000/park/category/${categoryId}/location/${locationId}`
            : `http://localhost:8000/park/category/${categoryId}`
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

  // Fungsi untuk mengonversi buffer gambar ke base64 string
  const bufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

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
              // Mengonversi buffer ke base64 string
              const base64Image = `data:image/jpeg;base64,${bufferToBase64(
                place.gambar.data
              )}`;
              return (
                <Link
                  to={`/places/${place.id_tempat}`}
                  key={`place-${place.id_tempat}`}
                  className="Kategoriplace-card"
                >
                  <img src={base64Image} alt={place.nama_tempat} />
                  <h3>{place.nama_tempat}</h3>
                </Link>
              );
            })
          ) : (
            <p>No places found.</p> // Tambahkan ini untuk debugging
          )}
        </div>
      </div>
    </section>
  );
}

export default KategoriTempat;
