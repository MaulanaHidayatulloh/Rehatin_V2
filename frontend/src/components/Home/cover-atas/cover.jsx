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
        <h1>Let’s Hangout Now!</h1>
        <h3>Get started on your hangout planning</h3>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Where do you want to go?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </section>
  );
}

export default Cover;
