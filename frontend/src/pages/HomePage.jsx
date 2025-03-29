import CardCategory from "../components/Home/category/CardCategory";
import Footer from "../components/Home/footer/FooterComponent";
import AboutUs from "../components/Home/about-us/aboutus";
import Cover from "../components/Home/cover-atas/cover";
import City from "../components/Home/city/city";
import Event from "../components/Home/event/event";
import Recommendation from "../components/Home/recommendation/recommendation";
import PopularDays from "../components/Home/popularDays/popularDays";

const HomePage = () => {
  return (
    <div>
      <Cover />
      <AboutUs />
      <City />
      <Recommendation />
      <Event />
      <CardCategory />
      <PopularDays />
      <Footer />
    </div>
  );
};

export default HomePage;
