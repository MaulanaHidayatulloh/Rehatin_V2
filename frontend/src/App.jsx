import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchResults from "./pages/SearchResults";
import AboutPage from "./pages/AboutPages";
import WishlistPage from "./pages/WishlistPage";
import GalleryPage from "./pages/GalleryPages";
import TheEliteShowcase from "./pages/InformationEvent/TheEliteShowcase";
import WakuWakuFestival from "./pages/InformationEvent/WakuWakuFestival";
import PestaBebasBerselancar from "./pages/InformationEvent/PestaBebasBerselancar";
import TheSoundsProject from "./pages/InformationEvent/TheSoundsProject";
import PekanRayaJakarta from "./pages/InformationEvent/PekanRayaJakarta";
import JDMFestBandung from "./pages/InformationEvent/JDMFestBandung";
import Jawa from "./pages/Places/jawa";
import Sumatra from "./pages/Places/sumatra";
import Kalimantan from "./pages/Places/kalimantan";
import Sulawesi from "./pages/Places/sulawesi";
import Papua from "./pages/Places/papua";
import Bali from "./pages/Places/bali";
import PlaceDetails from "./pages/PlaceDetails";
import NavbarCom from "./components/Home/navbar/navbar";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import KategoriTempat from "./pages/Places/KategoriTempat-Pages";
import { BubbleChat } from "flowise-embed-react";
import AdminHome from "./pages/adminHome";
import AdminEditTempat from "./pages/editTempatAdmin";
import AdminTambahTempat from "./pages/tambahTempatAdmin";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("user", JSON.stringify(user));
  }, [isLoggedIn, user]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
  };

  return (
    <div>
      <Router>
        <NavbarCom
          isLoggedIn={isLoggedIn}
          user={user}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/aboutUs" element={<AboutPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/TheEliteShowcase" element={<TheEliteShowcase />} />
          <Route path="/WakuWakuFestival" element={<WakuWakuFestival />} />
          <Route
            path="/PestaBebasBerselancar"
            element={<PestaBebasBerselancar />}
          />
          <Route path="/TheSoundsProject" element={<TheSoundsProject />} />
          <Route path="/PekanRayaJakarta" element={<PekanRayaJakarta />} />
          <Route path="/JDMFestBandung" element={<JDMFestBandung />} />
          <Route path="/Jawa" element={<Jawa />} />
          <Route path="/Sumatra" element={<Sumatra />} />
          <Route path="/Kalimantan" element={<Kalimantan />} />
          <Route path="/Sulawesi" element={<Sulawesi />} />
          <Route path="/Papua" element={<Papua />} />
          <Route path="/Bali" element={<Bali />} />
          <Route
            path="/places/:id"
            element={<PlaceDetails user={user} isLoggedIn={isLoggedIn} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/category/:categoryId" element={<KategoriTempat />} />
          <Route
            path="/category/:categoryId/location/:locationId"
            element={<KategoriTempat />}
          />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/edit-tempat/:id" element={<AdminEditTempat />} />
          <Route
            path="/admin-tambahTempatWisata"
            element={<AdminTambahTempat />}
          />
        </Routes>
      </Router>
      <BubbleChat
        chatflowid="70922b7f-3bfb-4d33-a0a9-ddbea0278340"
        apiHost="http://localhost:3000"
        theme={{
          button: {
            backgroundColor: "#2daf94",
            right: 40,
            bottom: 27,
            size: 70,
          },
          chatWindow: {
            showTitle: true,
            showAgentMessages: true,
            title: "ChatBot Rehatin",
            welcomeMessage: "Hallo, Ada yang bisa saya bantu?",
            errorMessage: "mohon maaf, saya tidak tau!",
            backgroundColor: "#ffffff",
            fontSize: 17,
            starterPrompts: [
              "tempat wisata terbaik di pulau Jawa",
              "tempat wisata dengan rating tertinggi",
            ],
            starterPromptFontSize: 15,
            clearChatOnReload: true,
            renderHTML: true,
            userMessage: {
              backgroundColor: "#468392",
              textColor: "#ffffff",
            },
            textInput: {
              placeholder: "Ketik yang ingin ditanyakan!",
              backgroundColor: "#F3F8FF",
              textColor: "#303235",
              sendButtonColor: "#2daf94",
              maxChars: 100,
              maxCharsWarningMessage:
                "Anda telah melampaui batas karakter. Harap masukkan kurang dari 100 karakter.",
              autoFocus: true,
            },
            feedback: {
              color: "#303235",
            },
            dateTimeToggle: {
              date: true,
              time: true,
            },
            footer: {
              textColor: "#303235",
              text: "Dirancang Oleh",
              company: "Maulana",
              companyLink: "https://github.com/MaulanaHidayatulloh",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
