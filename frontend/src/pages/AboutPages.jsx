import CardAbout from "../components/about/tabAbout";
import CoverAbout from "../components/about/cover-about";
import About from "../components/about/about";
import VisiMisi from "../components/about/visimisi";
import Kontak from "../components/about/contact";
import Footer from "../components/Home/footer/FooterComponent";

const AboutPage = () => {
  return (
    <div>
      <CoverAbout />
      <CardAbout />
      <About />
      <VisiMisi />
      <Kontak />
      <Footer />
    </div>
  );
};

export default AboutPage;
