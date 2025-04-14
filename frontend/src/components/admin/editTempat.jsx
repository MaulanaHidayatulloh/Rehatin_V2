import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditTempat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama_tempat: "",
    kategori_tempat: "",
    kategori_lokasi: "",
    lokasi: "",
    harga: "",
    deskripsi: "",
    gambar_path: null,
    gambar_map: null,
    link_map: "",
  });

  const [kategoriTempat, setKategoriTempat] = useState([]);
  const [kategoriLokasi, setKategoriLokasi] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/adminPlace/${id}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:8000/adminPlace/kategori-tempat")
      .then((res) => setKategoriTempat(res.data));

    axios
      .get("http://localhost:8000/adminPlace/kategori-lokasi")
      .then((res) => setKategoriLokasi(res.data));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    try {
      await axios.put(`http://localhost:8000/adminPlace/${id}`, data);
      navigate("/admin-home");
    } catch (err) {
      console.error("Error updating place:", err);
    }
  };

  return (
    <section className="edit-tempat">
      <h2>Edit Tempat</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="nama_tempat"
          value={formData.nama_tempat}
          onChange={handleChange}
          placeholder="Nama Tempat"
        />

        <select
          name="kategori_tempat"
          value={formData.kategori_tempat}
          onChange={handleChange}
        >
          <option value="">Pilih Kategori Tempat</option>
          {kategoriTempat.map((item) => (
            <option key={item.id_kt} value={item.id_kt}>
              {item.nama_kategori_tempat}
            </option>
          ))}
        </select>

        <select
          name="kategori_lokasi"
          value={formData.kategori_lokasi}
          onChange={handleChange}
        >
          <option value="">Pilih Kategori Lokasi</option>
          {kategoriLokasi.map((item) => (
            <option key={item.id_kl} value={item.id_kl}>
              {item.nama_kategori_lokasi}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="lokasi"
          value={formData.lokasi}
          onChange={handleChange}
          placeholder="Lokasi"
        />

        <input
          type="text"
          name="harga"
          value={formData.harga}
          onChange={handleChange}
          placeholder="Harga"
        />

        <textarea
          name="deskripsi"
          value={formData.deskripsi}
          onChange={handleChange}
          placeholder="Deskripsi"
        ></textarea>

        <label>Gambar Utama:</label>
        <input
          type="file"
          name="gambar_path"
          accept="image/*"
          onChange={handleChange}
        />

        <label>Gambar Map:</label>
        <input
          type="file"
          name="gambar_map"
          accept="image/*"
          onChange={handleChange}
        />

        <input
          type="text"
          name="link_map"
          value={formData.link_map}
          onChange={handleChange}
          placeholder="Link Map"
        />

        <button type="submit">Simpan Perubahan</button>
      </form>
    </section>
  );
};

export default EditTempat;
