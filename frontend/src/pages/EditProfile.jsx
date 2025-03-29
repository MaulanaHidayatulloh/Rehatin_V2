import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Home/footer/FooterComponent";
import styles from "./EditProfile.module.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    email: user.email || "",
    gender: user.gender || "",
    tanggal_lahir: user.tanggal_lahir || "",
    asal: user.asal || "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = new FormData();
      for (let key in formData) {
        if (formData[key] !== null) {
          updatedData.append(key, formData[key]);
        }
      }

      await axios.put(
        `http://localhost:8000/auth/user/${user.id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Perbarui localStorage
      const userData = { ...formData };
      delete userData.photo; // Hapus foto dari userData untuk disimpan di localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/profile");
    } catch (error) {
      console.error("Error saat memperbarui data pengguna", error);
    }
  };

  return (
    <div>
      <div className={styles.editProfileContainer}>
        <div className={styles.editProfileTitle}>
          <h2>Edit Profile</h2>
        </div>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            {user && user.foto ? (
              <img
                src={`data:image/png;base64,${user.foto}`}
                alt="User"
                className={styles.userPhoto}
              />
            ) : (
              <img
                src="../public/logo/default.png"
                alt="User"
                className={styles.userPhoto}
              />
            )}
          </div>

          <div className={styles.profileData}>
            <h3>Identity</h3>
            <form onSubmit={handleSubmit} className={styles.editProfileForm}>
              <div className={styles.formItem}>
                <label>Nama Depan</label>
                <span>:</span>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formItem}>
                <label>Nama Belakang</label>
                <span>:</span>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formItem}>
                <label>Gender</label>
                <span>:</span>
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formItem}>
                <label>Tanggal Lahir</label>
                <span>:</span>
                <input
                  type="date"
                  name="tanggal_lahir"
                  value={formData.tanggal_lahir}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formItem}>
                <label>Asal</label>
                <span>:</span>
                <input
                  type="text"
                  name="asal"
                  value={formData.asal}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formItem}>
                <label>Foto Profile</label>
                <span>:</span>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                  style={{ border: "none" }}
                />
              </div>
              <div className={styles.buttonContainer}>
                <button type="button" onClick={() => navigate("/profile")}>
                  Batal
                </button>
                <button type="submit">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EditProfile;
