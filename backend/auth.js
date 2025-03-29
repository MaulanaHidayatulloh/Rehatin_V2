const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const database = require("./model/database");

// Middleware untuk mengunggah file menggunakan multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Fungsi untuk mengonversi buffer ke Base64
const encodeImageToBase64 = (buffer) => {
  return buffer.toString("base64");
};

router.post(
  "/register",
  [
    body("first_name").notEmpty().withMessage("Nama depan harus diisi"),
    body("last_name").notEmpty().withMessage("Nama belakang harus diisi"),
    body("email").isEmail().withMessage("Email harus valid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Kata sandi harus minimal 6 karakter"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      first_name,
      last_name,
      email,
      password,
      gender,
      tanggal_lahir,
      asal,
    } = req.body;

    try {
      // Periksa apakah pengguna sudah ada
      const [existingUser] = await database.query(
        "SELECT * FROM user WHERE email = ?",
        [email]
      );
      if (existingUser.length > 0) {
        return res.status(400).json({ error: "Email sudah digunakan" });
      }

      // Hash kata sandi
      const hashedPassword = await bcrypt.hash(password, 10);

      // Masukkan pengguna baru ke database
      const result = await database.query(
        "INSERT INTO user (first_name, last_name, email, password, gender, tanggal_lahir, asal, foto, level, tanggal_daftar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())",
        [
          first_name,
          last_name,
          email,
          hashedPassword,
          gender,
          tanggal_lahir,
          asal,
          Buffer.alloc(0),
          1,
        ]
      );

      if (result.affectedRows === 1) {
        return res.status(201).json({ message: "Pengguna berhasil terdaftar" });
      } else {
        throw new Error("Gagal memasukkan pengguna ke database");
      }
    } catch (error) {
      console.error("Error saat mendaftarkan pengguna:", error);
      return res
        .status(500)
        .json({ error: "Gagal mendaftarkan pengguna di database" });
    }
  }
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email harus valid"),
    body("password").notEmpty().withMessage("Kata sandi harus diisi"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Temukan pengguna berdasarkan email
      const [users] = await database.query(
        "SELECT * FROM user WHERE email = ?",
        [email]
      );
      if (users.length === 0) {
        return res
          .status(400)
          .json({ error: "Email atau kata sandi tidak valid" });
      }

      const user = users[0];

      // Periksa kata sandi
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ error: "Email atau kata sandi tidak valid" });
      }

      // Encode gambar ke Base64
      let fotoBase64 = null;
      if (user.foto) {
        fotoBase64 = encodeImageToBase64(user.foto);
      }

      // Format tanggal lahir
      const birthDate = new Date(user.tanggal_lahir);
      const formattedBirthDate = `${birthDate.getFullYear()}-${String(
        birthDate.getMonth() + 1
      ).padStart(2, "0")}-${String(birthDate.getDate()).padStart(2, "0")}`;

      // Simpan info pengguna di sesi
      req.session.user = {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        foto: fotoBase64,
        last_name: user.last_name,
        gender: user.gender,
        tanggal_daftar: user.tanggal_daftar,
        tanggal_lahir: formattedBirthDate,
        asal: user.asal,
      };

      return res.json({
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          foto: fotoBase64,
          gender: user.gender,
          tanggal_daftar: user.tanggal_daftar,
          tanggal_lahir: formattedBirthDate,
          asal: user.asal,
        },
      });
    } catch (error) {
      console.error("Error saat login:", error);
      return res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
  }
);

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Tidak bisa logout, coba lagi" });
    }
    res.clearCookie("connect.sid");
    return res.json({ message: "Berhasil logout" });
  });
});

router.put("/user/:id", upload.single("photo"), async (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;
  const photo = req.file ? req.file.buffer : null;

  try {
    let query = `UPDATE user 
                 SET first_name = ?, last_name = ?, email = ?, gender = ?, tanggal_lahir = ?, asal = ?`;
    let queryParams = [
      updatedUserData.first_name,
      updatedUserData.last_name,
      updatedUserData.email,
      updatedUserData.gender,
      updatedUserData.tanggal_lahir,
      updatedUserData.asal,
      userId,
    ];

    // Jika ada foto baru, tambahkan ke query dan parameter
    if (photo) {
      query += ", foto = ?";
      queryParams.splice(queryParams.length - 1, 0, photo); // Sisipkan foto sebelum userId
    }

    query += " WHERE id = ?";

    // Update data pengguna di database
    await database.query(query, queryParams);

    return res
      .status(200)
      .json({ message: "Data pengguna berhasil diperbarui" });
  } catch (error) {
    console.error("Error saat memperbarui data pengguna:", error);
    return res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
});

module.exports = router;
