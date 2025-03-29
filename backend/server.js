const express = require("express");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const knex = require("knex")(require("./knexfile"));
const { PORT } = require("./config/appConfig");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS (assuming you need it)
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Session store configuration
const store = new KnexSessionStore({
  knex,
  tablename: "sessions", // Nama tabel untuk menyimpan sesi
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      maxAge: 1000 * 60 * 60, // Sesi kadaluarsa setelah 1 jam
      secure: false, // Set ke true jika menggunakan HTTPS
    },
  })
);

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is not defined in .env!");
}

// Include the route handlers from separate files
const jakartaRoutes = require("./routes/jakarta");
const bogorRoutes = require("./routes/bogor");
const depokRoutes = require("./routes/depok");
const tangerangRoutes = require("./routes/tangerang");
const bekasiRoutes = require("./routes/bekasi");
const bandungRoutes = require("./routes/bandung");
const SemuaTempat = require("./routes/SemuaTempat");
const authRoutes = require("./auth");
const parkRoutes = require("./routes/park");

// Mount the routes on specific paths
app.use("/jakarta", jakartaRoutes);
app.use("/bogor", bogorRoutes);
app.use("/depok", depokRoutes);
app.use("/tangerang", tangerangRoutes);
app.use("/bekasi", bekasiRoutes);
app.use("/bandung", bandungRoutes);
app.use("/place", SemuaTempat);
app.use("/auth", authRoutes);
app.use("/park", parkRoutes);

// Function to handle errors
function handleError(err, res) {
  console.error("Error:", err);
  res.status(500).json({ error: "Terjadi kesalahan pada server" });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Terjadi kesalahan pada server" });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
