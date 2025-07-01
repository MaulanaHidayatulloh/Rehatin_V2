import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./tambahTempat.css";

const TambahTempat = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama_tempat: "",
    kategori_tempat: "",
    kategori_lokasi: "",
    lokasi: "",
    harga: "",
    deskripsi: "",
    gambar_path: null,
    link_map: "",
  });

  const [kategoriTempat, setKategoriTempat] = useState([]);
  const [kategoriLokasi, setKategoriLokasi] = useState([]);
  const [previewGambarUtama, setPreviewGambarUtama] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/adminPlace/kategori-tempat")
      .then((res) => setKategoriTempat(res.data));
    axios
      .get("http://localhost:8000/adminPlace/kategori-lokasi")
      .then((res) => setKategoriLokasi(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const updatedValue = files ? files[0] : value;

    setFormData({
      ...formData,
      [name]: updatedValue,
    });

    // Preview
    if (name === "gambar_path" && files) {
      setPreviewGambarUtama(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await axios.post("http://localhost:8000/adminPlace", data);
      navigate("/admin-home");
    } catch (err) {
      console.error("Error adding place:", err);
    }
  };

  return (
    <section className="tambah-tempat">
      <h2>Tambah Tempat Wisata</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="nama_tempat">Nama Tempat :</label>
        <input
          type="text"
          id="nama_tempat"
          name="nama_tempat"
          value={formData.nama_tempat}
          onChange={handleChange}
          placeholder="Nama Tempat"
          required
        />

        <label htmlFor="kategori_tempat">Kategori Tempat :</label>
        <select
          id="kategori_tempat"
          name="kategori_tempat"
          value={formData.kategori_tempat}
          onChange={handleChange}
          required
        >
          <option value="">Pilih Kategori Tempat</option>
          {kategoriTempat.map((item) => (
            <option key={item.id_kt} value={item.id_kt}>
              {item.nama_kategori_tempat}
            </option>
          ))}
        </select>

        <label htmlFor="kategori_lokasi">Kategori Lokasi :</label>
        <select
          id="kategori_lokasi"
          name="kategori_lokasi"
          value={formData.kategori_lokasi}
          onChange={handleChange}
          required
        >
          <option value="">Pilih Kategori Lokasi</option>
          {kategoriLokasi.map((item) => (
            <option key={item.id_kl} value={item.id_kl}>
              {item.nama_kategori_lokasi}
            </option>
          ))}
        </select>

        <label htmlFor="lokasi">Lokasi :</label>
        <input
          type="text"
          id="lokasi"
          name="lokasi"
          value={formData.lokasi}
          onChange={handleChange}
          placeholder="Lokasi"
          required
        />

        <label htmlFor="harga">Harga :</label>
        <input
          type="text"
          id="harga"
          name="harga"
          value={formData.harga}
          onChange={handleChange}
          placeholder="Harga"
          required
        />

        <label htmlFor="deskripsi">Deskripsi :</label>
        <textarea
          id="deskripsi"
          name="deskripsi"
          value={formData.deskripsi}
          onChange={handleChange}
          placeholder="Deskripsi"
          required
        ></textarea>

        <label htmlFor="gambar_path">Gambar :</label>
        <input
          type="file"
          id="gambar_path"
          name="gambar_path"
          accept="image/*"
          onChange={handleChange}
          required
        />
        {previewGambarUtama && (
          <img
            src={previewGambarUtama}
            alt="Preview Gambar Utama"
            className="preview-img"
          />
        )}

        <label htmlFor="link_map">Link Map :</label>
        <input
          type="text"
          id="link_map"
          name="link_map"
          value={formData.link_map}
          onChange={handleChange}
          placeholder="Link Map"
          required
        />

        <button type="submit">Tambah Tempat</button>
      </form>
    </section>
  );
};

export default TambahTempat;
