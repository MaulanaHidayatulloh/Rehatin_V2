const express = require("express");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const knex = require("knex")(require("./knexfile"));
const cors = require("cors");
const dotenv = require("dotenv");
const { PORT } = require("./config/appConfig");

// Load environment variables
dotenv.config();

if (!process.env.SESSION_SECRET) {
  console.error("SESSION_SECRET is not defined in .env!");
  process.exit(1); // Hentikan aplikasi jika tidak ada SESSION_SECRET
}

const app = express();

// Middleware untuk parsing JSON & URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middleware untuk serving gambar dari folder /public/uploads
app.use("/uploads", express.static("public/uploads"));

// Middleware untuk serving gambar dari folder /public/gambar_komentar
app.use("/gambar_komentar", express.static("public/gambar_komentar"));

// Konfigurasi Session Store menggunakan Knex
const store = new KnexSessionStore({
  knex,
  tablename: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false, // Set ke true jika menggunakan HTTPS
    },
  })
);

// Import & Gunakan Routes
const jawaRoutes = require("./routes/jawa");
const sumatraRoutes = require("./routes/sumatra");
const kalimantanRoutes = require("./routes/kalimantan");
const sulawesiRoutes = require("./routes/sulawesi");
const papuaRoutes = require("./routes/papua");
const baliRoutes = require("./routes/bali");
const semuaTempatRoutes = require("./routes/SemuaTempat");
const authRoutes = require("./auth");
const kategoriTempatRoutes = require("./routes/kategori_tempat");
const wishlistRoutes = require("./routes/wishlist");
const adminPlaceRoutes = require("./routes/adminPlace");

app.use("/jawa", jawaRoutes);
app.use("/sumatra", sumatraRoutes);
app.use("/kalimantan", kalimantanRoutes);
app.use("/sulawesi", sulawesiRoutes);
app.use("/papua", papuaRoutes);
app.use("/bali", baliRoutes);
app.use("/place", semuaTempatRoutes);
app.use("/auth", authRoutes);
app.use("/kategoritempat", kategoriTempatRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/adminPlace", adminPlaceRoutes);

// Middleware untuk menangani error
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Terjadi kesalahan pada server",
  });
});

// Jalankan server
app.listen(PORT, () => console.log(`🚀 Server berjalan di port ${PORT}`));
