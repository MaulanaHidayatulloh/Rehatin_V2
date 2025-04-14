import TambahTempatWisata from "../components/admin/tambahTempat";
import Footer from "../components/Home/footer/FooterComponent";
import NavbarAdmin from "../components/admin/navbarAdmin";

const TambahTempatAdmin = () => {
  return (
    <div>
      <NavbarAdmin />
      <TambahTempatWisata />
      <Footer />
    </div>
  );
};

export default TambahTempatAdmin;
