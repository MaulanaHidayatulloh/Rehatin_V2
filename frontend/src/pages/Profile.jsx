import React from "react";
import { Link } from "react-router-dom";
import { GearFill } from "react-bootstrap-icons";
import Footer from "../components/Home/footer/FooterComponent";
import styles from "./Profile.module.css";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <div className={styles.profileContainer}>
        <div className={styles.profileTitle}>
          <h2>Self Profile</h2>
          <Link to="/edit-profile" className={styles.editProfileButton}>
            <GearFill /> Edit Profile
          </Link>
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
            <div className={styles.profileItem}>
              <label>Full Name</label>
              <span>:</span>
              <input
                type="text"
                value={`${user.first_name} ${user.last_name}`}
                readOnly
              />
            </div>
            <div className={styles.profileItem}>
              <label>Email</label>
              <span>:</span>
              <input type="text" value={user.email} readOnly />
            </div>
            <div className={styles.profileItem}>
              <label>Gender</label>
              <span>:</span>
              <input type="text" value={user.gender} readOnly />
            </div>
            <div className={styles.profileItem}>
              <label>Tanggal Lahir</label>
              <span>:</span>
              <input type="text" value={user.tanggal_lahir} readOnly />
            </div>
            <div className={styles.profileItem}>
              <label>Asal</label>
              <span>:</span>
              <input type="text" value={user.asal} readOnly />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
