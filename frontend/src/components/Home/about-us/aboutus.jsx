import React from "react";
import { useNavigate } from "react-router-dom";
import "./aboutus.css";
import { Link } from "react-router-dom";

function AboutUs() {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate("/aboutUs");
  };

  return (
    <section className="home">
      <div className="home-img">
        <img src="../src/assets/Home/about-us.png" alt="" />
      </div>
      <div className="home-content">
        <h2>ABOUT US</h2>
        <h1>WE ARE READY TO HELP YOU FIND A FUN PLACE TO HANGOUT</h1>
        <p>
          Rehatin is a diverse website, which provides recommendations for
          entertainment places that you can visit with your family or friends
          when the holiday season arrives, during your free time, or when you
          feel tired. With a very comprehensive collection of information,
          Rehatin helps you plan the perfect adventure and deliver an
          unforgettable holiday experience.
        </p>
        <button onClick={handleLearnMore}>Learn More</button>
      </div>
    </section>
  );
}

export default AboutUs;
