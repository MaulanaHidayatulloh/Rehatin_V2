import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cover.css";

function Cover() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <section className="cover">
      <div className="cover-top">
        <h1>Ayo Jelajahi Sekarang!</h1>
        <h3>Mulai rencanakan perjalananmu ke tempat wisata yang seru</h3>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Yuk, Jelajahi Tempat Wisata Seru Pilihanmu di Sini!"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Jelajahi</button>
      </div>
    </section>
  );
}

export default Cover;
