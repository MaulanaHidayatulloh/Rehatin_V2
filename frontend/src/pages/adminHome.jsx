import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Admin from "../components/admin/admin";
import Footer from "../components/Home/footer/FooterComponent";
import NavbarAdmin from "../components/admin/navbarAdmin";

const Admin_Home = () => {
  const navigate = useNavigate();

  // Ambil data user dari localStorage
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!isLoggedIn || !user || user.level !== 1) {
      navigate("/");
    }
  }, [isLoggedIn, user, navigate]);

  return (
    <div>
      <NavbarAdmin />
      <Admin />
      <Footer />
    </div>
  );
};

export default Admin_Home;
