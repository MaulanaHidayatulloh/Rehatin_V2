import React, { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";
import Login from "../../formlogin/formlogin";
import Dropdown from "react-bootstrap/Dropdown";
import { NavLink } from "react-router-dom";
import { List } from "react-bootstrap-icons";

function NavbarCom({ onLogout }) {
  const [show, setShow] = useState(false);
  const [userState, setUserState] = useState(null);
  const [isLoggedInState, setIsLoggedInState] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navbarNavRef = useRef(null);
  const hamburgerMenuRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedActiveNav = localStorage.getItem("activeNav");

    if (storedUser && storedIsLoggedIn) {
      setUserState(JSON.parse(storedUser));
      setIsLoggedInState(true);
    } else {
      setUserState(null);
      setIsLoggedInState(false);
    }

    if (storedActiveNav) {
      setActiveNav(storedActiveNav);
    }

    const handleClickOutside = (e) => {
      if (
        navbarNavRef.current &&
        !navbarNavRef.current.contains(e.target) &&
        hamburgerMenuRef.current &&
        !hamburgerMenuRef.current.contains(e.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUserLogin = (user) => {
    setUserState(user);
    setIsLoggedInState(true);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", true);
  };

  const handleUserLogout = () => {
    setUserState(null);
    setIsLoggedInState(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    onLogout();
  };

  useEffect(() => {
    const user = localStorage.getItem("user") || sessionStorage.getItem("user");
    const isLoggedIn =
      localStorage.getItem("isLoggedIn") ||
      sessionStorage.getItem("isLoggedIn");

    if (user && isLoggedIn) {
      setUserState(JSON.parse(user));
      setIsLoggedInState(JSON.parse(isLoggedIn));
    } else {
      setUserState(null);
      setIsLoggedInState(false);
    }
  }, []);

  const handleNavClick = (nav) => {
    setActiveNav(nav);
    localStorage.setItem("activeNav", nav);
  };

  //Toggle class active untuk hamburger menu
  //Ketika hamburger menu di klik
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <a className={styles.navbarLogo}>
        <img src="../public/logo/logo_rehatin.png" alt="logo" />
      </a>
      <nav className={styles.navbar}>
        <div
          className={`${styles.navbarNav} ${
            isMobileMenuOpen ? styles.active : ""
          }`}
          ref={navbarNavRef}
        >
          <NavLink
            to="/"
            className={`${styles.nav} ${
              activeNav === "home" ? styles.active : ""
            }`}
            onClick={() => handleNavClick("home")}
          >
            Home
          </NavLink>
          <NavLink
            to="/aboutUs"
            className={`${styles.nav} ${
              activeNav === "aboutUs" ? styles.active : ""
            }`}
            onClick={() => handleNavClick("aboutUs")}
          >
            About Us
          </NavLink>
          <NavLink
            to="/wishlist"
            className={`${styles.nav} ${
              activeNav === "wishlist" ? styles.active : ""
            }`}
            onClick={() => handleNavClick("wishlist")}
          >
            Wishlist
          </NavLink>
        </div>
        {isLoggedInState ? (
          <div className={styles.userInfo}>
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                style={{
                  backgroundColor: "transparent",
                  border: "transparent",
                }}
                className="profile_dropdown"
              >
                {userState && userState.foto ? (
                  <img
                    src={`data:image/png;base64,${userState.foto}`}
                    alt="user"
                    className={styles.userPhoto}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "100%",
                      border: "1px solid #c4c4c4",
                    }}
                  />
                ) : (
                  <img
                    src="../public/logo/default.png"
                    alt="user"
                    className={styles.userPhoto}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "100%",
                      border: "1px solid #c4c4c4",
                    }}
                  />
                )}
                <span
                  style={{
                    fontSize: "1.1rem",
                    paddingLeft: "1rem",
                    paddingRight: "0.2rem",
                  }}
                >
                  {userState?.first_name}
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/profile" style={{ fontWeight: "bold" }}>
                  <img
                    src="../public/profile-icon.svg"
                    alt="profile"
                    style={{ paddingRight: "1rem" }}
                  />
                  Edit Profile
                </Dropdown.Item>
                <Dropdown.Item style={{ padding: "0" }}>
                  <button className={styles.logout} onClick={handleUserLogout}>
                    <img
                      src="../public/logout-icon.svg"
                      alt="profile"
                      style={{ paddingRight: "1rem" }}
                    />
                    Log Out
                  </button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <button className={styles.login} onClick={handleShow}>
            Log In
          </button>
        )}
        <div
          id="hamburger-menu"
          onClick={toggleMobileMenu}
          ref={hamburgerMenuRef}
          className={styles.hamburgerMenu}
        >
          <List />
        </div>
      </nav>
      <Login
        show={show}
        handleClose={handleClose}
        setUser={handleUserLogin}
        setIsLoggedIn={setIsLoggedInState}
      />
    </header>
  );
}

export default NavbarCom;
