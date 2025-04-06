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
import Jakarta from "./pages/Places/jakarta";
import Bogor from "./pages/Places/bogor";
import Depok from "./pages/Places/depok";
import Tangerang from "./pages/Places/tangerang";
import Bekasi from "./pages/Places/bekasi";
import Bandung from "./pages/Places/bandung";
import PlaceDetails from "./pages/PlaceDetails";
import NavbarCom from "./components/Home/navbar/navbar";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import KategoriTempat from "./pages/Places/KategoriTempat-Pages";
import { BubbleChat } from "flowise-embed-react";
import { Display } from "react-bootstrap-icons";

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
          <Route path="/Jakarta" element={<Jakarta />} />
          <Route path="/Bogor" element={<Bogor />} />
          <Route path="/Depok" element={<Depok />} />
          <Route path="/Tangerang" element={<Tangerang />} />
          <Route path="/Bekasi" element={<Bekasi />} />
          <Route path="/Bandung" element={<Bandung />} />
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
              "tempat wisata terbaik di Jakarta",
              "tempat wisata dengan rating tertinggi",
            ],
            starterPromptFontSize: 15,
            clearChatOnReload: true,
            renderHTML: true,
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
