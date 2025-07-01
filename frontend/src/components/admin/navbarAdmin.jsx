import React, { useState, useEffect, useRef } from "react";
import styles from "./navbarAdmin.module.css";
import Login from "../formlogin/formlogin";
import Dropdown from "react-bootstrap/Dropdown";
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

    fetch("http://localhost:8000/auth/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Logout response:", data);
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
    window.location.href = "/";
    onLogout && onLogout();
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

  const [displayedName, setDisplayedName] = useState("");

  useEffect(() => {
    const updateName = () => {
      if (userState?.first_name) {
        const isMobile = window.innerWidth <= 768;
        const name = userState.first_name;
        const trimmed =
          isMobile && name.length > 7 ? name.slice(0, 7) + "…" : name;
        setDisplayedName(trimmed);
      }
    };

    updateName();
    window.addEventListener("resize", updateName);

    return () => {
      window.removeEventListener("resize", updateName);
    };
  }, [userState]);

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
      <a className={styles.navbarLogo} href="/">
        <img src="../public/logo/logo_rehatin.png" alt="logo" />
      </a>
      <nav className={styles.navbar}>
        <div
          className={`${styles.navbarNav} ${
            isMobileMenuOpen ? styles.active : ""
          }`}
          ref={navbarNavRef}
        ></div>
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
                    src={userState.foto}
                    alt="user"
                    className={styles.userPhoto}
                  />
                ) : (
                  <img
                    src="../public/logo/default.png"
                    alt="user"
                    className={styles.userPhoto}
                  />
                )}
                <span className={styles.userName}>{displayedName}</span>
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
