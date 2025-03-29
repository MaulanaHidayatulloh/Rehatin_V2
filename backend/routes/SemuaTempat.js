const express = require("express");
const router = express.Router();
const database = require("../model/database");
const authMiddleware = require("../middleware/authMiddleware");
const path = require("path");

function handleError(err, res) {
  console.error("Error:", err);
  res.status(500).json({ error: "Terjadi kesalahan pada server" });
}

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch place details
    const [placeResults] = await database.query(
      `SELECT id_tempat, nama_tempat, kategori_lokasi, lokasi, harga, deskripsi, gambar_path, gambar_map, link_map
      FROM tempat_hangout WHERE id_tempat = ?;`,
      [id]
    );

    if (placeResults.length === 0) {
      return res.status(404).json({ error: "Tempat tidak ditemukan" });
    }

    const place = placeResults[0];
    place.gambar_path = place.gambar_path
      ? `http://localhost:8000/uploads/${place.gambar_path}`
      : null;
    place.gambarMap = place.gambar_map
      ? `http://localhost:8000/uploads/${place.gambar_map}`
      : null;

    // Fetch user reviews
    const [reviewResults] = await database.query(
      `SELECT up.rating, up.ulasan, u.first_name, u.last_name, u.foto 
      FROM ulasan_pengguna up 
      JOIN user u ON up.id_user = u.id 
      WHERE up.tempat_id = ?;`,
      [id]
    );

    // Ubah path gambar user
    const reviewsWithPath = reviewResults.map((review) => {
      return {
        ...review,
        foto: review.foto
          ? `http://localhost:8000/uploads/users/${review.foto}`
          : null,
      };
    });

    place.reviews = reviewsWithPath;

    // Hitung rata-rata rating
    const totalRating = reviewsWithPath.reduce(
      (sum, review) => sum + (parseFloat(review.rating) || 0),
      0
    );
    place.averageRating =
      reviewsWithPath.length > 0 ? totalRating / reviewsWithPath.length : 0;

    // Distribusi rating
    const ratingDistribution = [0, 0, 0, 0, 0];
    reviewsWithPath.forEach((review) => {
      const ratingIndex = Math.floor(review.rating) - 1;
      if (ratingIndex >= 0 && ratingIndex < 5) {
        ratingDistribution[ratingIndex]++;
      }
    });
    place.ratingDistribution = ratingDistribution;

    res.json(place);
  } catch (err) {
    handleError(err, res);
  }
});

router.post("/:id/review", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { rating, ulasan } = req.body;
  const userId = req.session.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "User tidak terautentikasi" });
  }

  try {
    await database.query(
      "INSERT INTO ulasan_pengguna (tempat_id, id_user, rating, ulasan) VALUES (?, ?, ?, ?);",
      [id, userId, rating, ulasan]
    );

    const [newReviewResults] = await database.query(
      "SELECT up.rating, up.ulasan, u.first_name, u.last_name, u.foto FROM ulasan_pengguna up JOIN user u ON up.id_user = u.id WHERE up.tempat_id = ? AND up.id_user = ?;",
      [id, userId]
    );

    const newReview = newReviewResults[0];
    newReview.foto = newReview.foto
      ? `http://localhost:8000/uploads/users/${newReview.foto}`
      : null;

    res.status(201).json(newReview);
  } catch (err) {
    handleError(err, res);
  }
});

module.exports = router;
