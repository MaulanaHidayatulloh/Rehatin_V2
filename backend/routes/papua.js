const express = require("express");
const router = express.Router();
const database = require("../model/database");

router.get("/", async (req, res) => {
  try {
    const [results] = await database.query(`
      SELECT 
        th.id_tempat, 
        th.nama_tempat, 
        th.kategori_lokasi, 
        th.lokasi, 
        th.harga, 
        th.deskripsi, 
        th.gambar_path,
        AVG(up.rating) as average_rating
      FROM 
        tempat_wisata th 
      LEFT JOIN 
        ulasan_pengguna up 
      ON 
        th.id_tempat = up.tempat_id
      WHERE
        th.kategori_lokasi = 5
      GROUP BY
        th.id_tempat
      ORDER BY
        th.nama_tempat ASC;
    `);

    const places = results.map((place) => ({
      ...place,
      average_rating: place.average_rating
        ? parseFloat(place.average_rating).toFixed(1)
        : "0.0",
      gambar_path: `http://localhost:8000/uploads/${place.gambar_path}`,
    }));

    res.json(places);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
});

// Middleware untuk menyajikan gambar dari folder /public/uploads
router.use("/uploads", express.static("public/uploads"));

module.exports = router;
