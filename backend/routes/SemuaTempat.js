const express = require("express");
const router = express.Router();
const database = require("../model/database");
const authMiddleware = require("../middleware/authMiddleware");
const path = require("path");

function handleError(err, res) {
  console.error("Error:", err);
  res.status(500).json({ error: "Terjadi kesalahan pada server" });
}

// upload gambar ulasan
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/gambar_komentar"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { files: 3 }, // maksimal 3 gambar
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch place details
    const [placeResults] = await database.query(
      `SELECT id_tempat, nama_tempat, kategori_lokasi, lokasi, harga, deskripsi, gambar_path, gambar_map, link_map
      FROM tempat_wisata WHERE id_tempat = ?;`,
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
      `SELECT up.rating, up.ulasan, up.gambar_ulasan, u.first_name, u.last_name, u.foto 
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
        gambar_ulasan: review.gambar_ulasan
          ? JSON.parse(review.gambar_ulasan).map(
              (g) => `http://localhost:8000/gambar_komentar/${g}`
            )
          : [],
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

router.post(
  "/:id/review",
  authMiddleware,
  upload.array("gambar", 3),
  async (req, res) => {
    const { id } = req.params;
    const { rating, ulasan } = req.body;
    const userId = req.session.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "User tidak terautentikasi" });
    }

    const gambarPaths = req.files.map((file) => file.filename); // nama file
    const gambarJson = JSON.stringify(gambarPaths); // simpan sebagai array JSON

    try {
      // Menambahkan ulasan baru
      await database.query(
        "INSERT INTO ulasan_pengguna (tempat_id, id_user, rating, ulasan, gambar_ulasan) VALUES (?, ?, ?, ?, ?);",
        [id, userId, rating, ulasan, gambarJson]
      );

      try {
        const [avgResults] = await database.query(
          "SELECT AVG(rating) AS avgRating FROM ulasan_pengguna WHERE tempat_id = ?;",
          [id]
        );

        const avgRating = parseFloat(avgResults[0].avgRating) || 0;
        console.log("Avg Rating:", avgRating); // Debug

        await database.query(
          "UPDATE tempat_wisata SET rating = ? WHERE id_tempat = ?;",
          [avgRating.toFixed(2), id]
        );
      } catch (err) {
        console.error("Gagal update rating:", err.message); // Debug log
      }

      // Ambil review baru untuk dikirim ke frontend
      const [newReviewResults] = await database.query(
        "SELECT up.rating, up.ulasan, up.gambar_ulasan, u.first_name, u.last_name, u.foto FROM ulasan_pengguna up JOIN user u ON up.id_user = u.id WHERE up.tempat_id = ? AND up.id_user = ? ORDER BY up.id_ulasan DESC;",
        [id, userId]
      );

      const newReview = newReviewResults[0];
      newReview.foto = newReview.foto
        ? `http://localhost:8000/uploads/users/${newReview.foto}`
        : null;

      newReview.gambar_ulasan = newReview.gambar_ulasan
        ? JSON.parse(newReview.gambar_ulasan).map(
            (g) => `http://localhost:8000/gambar_komentar/${g}`
          )
        : [];

      res.status(201).json(newReview);
    } catch (err) {
      handleError(err, res);
    }
  }
);

module.exports = router;
