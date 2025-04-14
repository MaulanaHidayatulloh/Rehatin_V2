import Admin from "../components/admin/admin";
import Footer from "../components/Home/footer/FooterComponent";
import NavbarAdmin from "../components/admin/navbarAdmin";

const Admin_Home = () => {
  return (
    <div>
      <NavbarAdmin />
      <Admin />
      <Footer />
    </div>
  );
};

export default Admin_Home;
