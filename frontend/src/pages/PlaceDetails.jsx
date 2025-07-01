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
  const [reviewImages, setReviewImages] = useState([]);

  // upload gambar ulasan
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      alert("Maksimal 3 gambar saja.");
      window.location.reload();
      return;
    }
    setReviewImages(files);
  };

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

    const formData = new FormData();
    formData.append("rating", reviewRating);
    formData.append("ulasan", reviewText);
    reviewImages.forEach((file) => {
      formData.append("gambar", file); // sesuai nama field di multer
    });

    axios
      .post(`http://localhost:8000/place/${id}/review`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("Review submitted:", response.data);
        setPlace((prevPlace) => ({
          ...prevPlace,
          reviews: [...prevPlace.reviews, response.data],
        }));
        setReviewText("");
        setReviewRating(0);
        setReviewImages([]);
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
            src={place.gambar_path}
            alt={place.nama_tempat}
            onClick={() => handleImageClick(place.gambar_path)}
            className="placeImage"
          />
          <div className="placeDetail_info">
            <div className="placeDetail_title">
              <h1>{place.nama_tempat}</h1>
              <p>
                Perkiraan Harga: Rp{" "}
                {Number(place.harga).toLocaleString("id-ID")}
              </p>
            </div>
            <p>{renderRating(averageRating)}</p>
            <p style={{ color: "#5b5555" }}>{place.deskripsi}</p>
          </div>
        </div>

        <div className="placeDetail_map">
          <iframe
            src={place.link_map}
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <p>{place.lokasi}</p>
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
                misal 4.65 ){" "}
              </label>
            </div>
            <div className="inputGambarUlasan">
              <label>Upload Gambar (tidak wajib, maksimal 3 gambar) :</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />

              {/* Preview gambar */}
              {reviewImages.length > 0 && (
                <div
                  className="preview-gambar-ulasan"
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  {reviewImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={URL.createObjectURL(img)}
                      alt={`Preview ${idx}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            {/* input ulasan */}
            <div className="inputUlasan">
              <textarea
                value={reviewText}
                placeholder="Tambahkan ulasan kamu di sini!"
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
                        src={review.foto}
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
                    <div className="pemisah-nama-tanggal">
                      <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                        {review.first_name} {review.last_name}
                      </p>
                      <p style={{ marginTop: "5px" }}>
                        {review.tanggal_ulasan}
                      </p>
                    </div>
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
                  {/* review gambar */}
                  <p>{review.ulasan}</p>
                  {review.gambar_ulasan && review.gambar_ulasan.length > 0 && (
                    <div className="review-images">
                      {review.gambar_ulasan.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`Review ${idx}`}
                          style={{
                            width: "100px",
                            height: "100px",
                            margin: "5px",
                            borderRadius: "5px",
                            objectFit: "cover",
                            border: "1px solid #ccc",
                          }}
                          onClick={() => handleImageClick(img)}
                        />
                      ))}
                    </div>
                  )}
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
