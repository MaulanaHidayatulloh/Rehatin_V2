const express = require("express");
const router = express.Router();
const database = require("../model/database");
const authMiddleware = require("../middleware/authMiddleware");

function handleError(err, res) {
  console.error("Error:", err);
  res.status(500).json({ error: "Terjadi kesalahan pada server" });
}

// Fungsi untuk mengencode gambar ke base64
function encodeImageToBase64(imageData) {
  return Buffer.from(imageData).toString("base64");
}

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch place details
    const [placeResults] = await database.query(
      `
      SELECT 
        th.id_tempat, th.nama_tempat, th.kategori_lokasi, th.lokasi, th.harga, th.deskripsi, th.gambar, th.gambar_map, th.link_map
      FROM 
        tempat_hangout th
      WHERE 
        th.id_tempat = ?;
    `,
      [id]
    );

    // Fetch user reviews for the place
    const [reviewResults] = await database.query(
      `
      SELECT 
        up.rating, up.ulasan, u.first_name, u.last_name, u.foto 
      FROM 
        ulasan_pengguna up 
      JOIN 
        user u 
      ON 
        up.id_user = u.id 
      WHERE 
        up.tempat_id = ?;
    `,
      [id]
    );

    if (placeResults.length === 0) {
      return res.status(404).json({ error: "Tempat tidak ditemukan" });
    }

    const place = placeResults[0];
    place.gambarBase64 = Buffer.from(place.gambar).toString("base64");
    place.gambarMapBase64 = Buffer.from(place.gambar_map).toString("base64");

    // Convert user photos to base64 and attach to review objects
    const reviewsWithBase64Photos = reviewResults.map((review) => {
      if (review.foto) {
        return {
          ...review,
          foto: Buffer.from(review.foto).toString("base64"),
        };
      } else {
        return review;
      }
    });

    place.reviews = reviewsWithBase64Photos; // Attach reviews to the place object

    // Calculate average rating and rating distribution
    const totalRating = reviewsWithBase64Photos.reduce(
      (sum, review) => sum + parseFloat(review.rating),
      0
    );
    const averageRating =
      reviewsWithBase64Photos.length > 0
        ? totalRating / reviewsWithBase64Photos.length
        : 0;
    place.averageRating = averageRating; // Attach average rating to the place object

    // Calculate rating distribution
    const ratingDistribution = [0, 0, 0, 0, 0];
    reviewsWithBase64Photos.forEach((review) => {
      const ratingIndex = Math.floor(review.rating) - 1;
      if (ratingIndex >= 0 && ratingIndex < 5) {
        ratingDistribution[ratingIndex]++;
      }
    });
    place.ratingDistribution = ratingDistribution; // Attach rating distribution to the place object

    console.log("Place Data with Average Rating:", place);

    res.json(place);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
});

router.post("/:id/review", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { rating, ulasan } = req.body;
  const userId = req.session.user.id;

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
    if (newReview.foto) {
      newReview.foto = Buffer.from(newReview.foto).toString("base64");
    }

    res.status(201).json(newReview);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
});

module.exports = router;
