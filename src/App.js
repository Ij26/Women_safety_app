import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Onboarding from "./components/Onboarding";
import PanicLoader from "./components/PanicLoader";
import LocationOptions from "./components/LocationOptions";
import AlertOptions from "./components/AlertOptions";
import ParentsOptions from "./components/ParentsOptions";
import WomenLaws from "./components/WomenLaws";
import LawDetail from "./components/LawDetail";
import SelfDefence from "./components/SelfDefence";
import Login from "./components/Login";
import PoliceMap from "./components/PoliceMap";
import HospitalMap from "./components/HospitalMap";
import MetroMap from "./components/MetroMap";
import Notifications from "./components/Notifications";
import Signup from "./components/Signup";
import Panic from "./components/Panic";
import Contacts from "./components/Contacts";
import AddContact from "./components/AddContact";
import { RecoilRoot } from "recoil";
import "./App.css"; // Import any custom styles here if needed


function App() {
 

  return (
    <RecoilRoot>
    <Router>
      <Routes>
        <Route exact path="/" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/location-options" element={<LocationOptions />} />
        <Route path="/home" element={<Home />} />
        <Route path="/police-map" element={<PoliceMap />} />
        <Route path="/hospital-map" element={<HospitalMap />} />
        <Route path="/metro-map" element={<MetroMap />} />
        <Route path="/panic-loader" element={<PanicLoader />} />
        <Route path="/alert-options" element={<AlertOptions />} />
        <Route path="/parents-options" element={<ParentsOptions />} />
        <Route path="/women-laws" element={<WomenLaws />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/law-detail/:law" element={<LawDetail />} />
        <Route path="/self-defence" element={<SelfDefence />} />
        <Route path="/panic" element={<Panic />}></Route>
        <Route path="/contacts" element={<Contacts />} />
        {/* <Route path="/add-contact" element={<AddContact />} /> */}
      </Routes>
    </Router>
    </RecoilRoot>
  );
}

export default App;
