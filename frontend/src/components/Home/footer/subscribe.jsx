import React from "react";
import "./footer.css";

function Subscribe() {
  return (
    <div className="subscribe">
      <div className="subscribe-container">
        <img src="../src/assets/Home/subscribe.png" alt="" />
        <div className="subscribe-ket">
          <h1>Subscribe Our Newslater</h1>
          <p>
            receive update with the latest news, assets and insight from this
            site.
          </p>
          <div className="subscribe-search">
            <input type="text" placeholder="Your Email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
