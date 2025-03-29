import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { StarHalf, StarFill } from "react-bootstrap-icons";
import Spinner from "react-bootstrap/Spinner";
import { Modal } from "react-bootstrap";
import Footer from "../components/Home/footer/FooterComponent";
import "./PlaceDetails.css";

const PlaceDetail = ({ user, isLoggedIn }) => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/place/${id}`)
      .then((response) => {
        console.log("Place Data:", response.data);
        setPlace(response.data);
      })
      .catch((err) => {
        console.error("Error fetching place details:", err);
      });
  }, [id]);

  const handleReviewSubmit = () => {
    if (!isLoggedIn) {
      alert("Anda harus login untuk mengirim ulasan.");
      return;
    }

    const newReview = {
      tempat_id: id,
      rating: reviewRating,
      ulasan: reviewText,
      user_id: user.id,
    };

    axios
      .post(`http://localhost:8000/place/${id}/review`, newReview, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Review submitted:", response.data);
        setPlace((prevPlace) => ({
          ...prevPlace,
          reviews: [...prevPlace.reviews, response.data],
        }));
        setReviewText("");
        setReviewRating(0);
      })
      .catch((err) => {
        console.error("Error submitting review:", err);
      });
  };

  if (!place) {
    return <Spinner animation="border" variant="dark" />;
  }

  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarFill key={i} size={25} className="star-full" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" size={25} className="star-half" />);
    }

    return stars;
  };

  const averageRating = place.averageRating ?? 0;
  const ratingDistribution = place.ratingDistribution ?? [0, 0, 0, 0, 0];

  const handleImageClick = (image) => {
    setModalImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="PlaceDetail">
        <div className="place_ket">
          <img
            src={`data:image/png;base64,${place.gambarBase64}`}
            alt={place.nama_tempat}
            onClick={() =>
              handleImageClick(`data:image/png;base64,${place.gambarBase64}`)
            }
            className="placeImage"
          />
          <div className="placeDetail_info">
            <div className="placeDetail_title">
              <h1>{place.nama_tempat}</h1>
              <p>Perkiraan Harga: Rp. {place.harga}</p>
            </div>
            <p>{renderRating(averageRating)}</p>
            <p style={{ color: "#5b5555" }}>{place.deskripsi}</p>
          </div>
        </div>

        <div className="placeDetail_map">
          <a href={place.link_map} style={{ textDecoration: "none" }}>
            <img
              src={`data:image/png;base64,${place.gambarMapBase64}`}
              alt={place.nama_tempat}
            />
            <p>{place.lokasi}</p>
          </a>
        </div>

        <div className="placeDetail_review">
          <h3>Review</h3>
          <div className="rating-placeDetail">
            <div className="placeReview_rating">
              <p style={{ fontSize: "3rem", fontWeight: "bold" }}>
                {averageRating.toFixed(2)}
              </p>
              <p>{renderRating(averageRating)}</p>
              <p>{place.reviews.length} Review</p>
            </div>
            <div className="rating-distribution">
              {ratingDistribution
                .slice()
                .reverse()
                .map((count, index) => (
                  <div key={index} className="rating-bar">
                    <span>{5 - index}</span>
                    <div className="bar-container">
                      <div
                        className="bar"
                        style={{
                          width: `${(count / place.reviews.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="placeDetail_ulasan">
            <h4>Leave a Review</h4>
            <div className="inputRating">
              <label>Rating : </label>
              <input
                type="number"
                value={reviewRating}
                onChange={(e) => setReviewRating(parseFloat(e.target.value))}
                min="0"
                max="5"
                step="0.01"
              />{" "}
              <label style={{ fontStyle: "italic" }}>
                {" "}
                (Input Rating 1 - 5, boleh tambahkan dua angka di belakang koma,
                misal 4,65 ){" "}
              </label>
            </div>
            <div className="inputUlasan">
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>
              <div style={{ textAlign: "right" }}>
                <button onClick={handleReviewSubmit}>Kirim Ulasan</button>
              </div>
            </div>
          </div>
        </div>

        <div className="kumpulanReview_container">
          {place.reviews.length > 0 ? (
            place.reviews
              .slice()
              .reverse()
              .map((review, index) => (
                <div key={index} className="Kumpulanreview-card">
                  <div className="Kumpulanreview_profil">
                    {review.foto ? (
                      <img
                        src={`data:image/png;base64,${review.foto}`}
                        alt="user"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "100%",
                          border: "1px solid #000",
                        }}
                      />
                    ) : (
                      <img
                        src="../public/logo/default.png"
                        alt="user"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "100%",
                          border: "1px solid #000",
                        }}
                      />
                    )}
                    <p style={{ paddingTop: "0.8rem", fontSize: "1.2rem" }}>
                      {review.first_name} {review.last_name}
                    </p>
                  </div>

                  <p className="RatingAndReview">
                    {typeof review.rating === "number"
                      ? review.rating.toFixed(2)
                      : review.rating}
                    {Array.from(
                      { length: Math.floor(review.rating) },
                      (_, i) => (
                        <StarFill key={i} size={17} className="star-full" />
                      )
                    )}
                    {review.rating % 1 !== 0 && (
                      <StarHalf size={17} className="star-half" />
                    )}
                  </p>
                  <p>{review.ulasan}</p>
                </div>
              ))
          ) : (
            <p>Belum ada ulasan.</p>
          )}
        </div>

        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              {place.nama_tempat}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={modalImage} alt="Full Size" style={{ width: "100%" }} />
          </Modal.Body>
        </Modal>
      </div>

      <Footer />
    </div>
  );
};

export default PlaceDetail;
