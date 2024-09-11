import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCog,
  faBell,
  faInfoCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSetRecoilState } from "recoil";
import { LoginCheck } from "../store/atoms/atom";

function SlidingMenu({ isOpen, toggleMenu }) {
  const setLogin= useSetRecoilState(LoginCheck);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
       
      // Handle WebSocket close event
      const socket = new WebSocket(`ws://localhost:5173?userId=${localStorage.getItem("userId")}`);
      socket.onclose = () => {
      console.log("WebSocket connection closed", localStorage.getItem("userId"));
      };

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userId");
      setLogin(false);

      // Navigate to the login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleNotifications= async() =>{
    navigate("/notifications")
  }


  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
      style={{ visibility: isOpen ? "visible" : "hidden" }}
    >
      <div className="p-6">
        <img
          src="https://morbiupdate.com/wp-content/uploads/2022/04/women-protection-black-glyph-icon-protect-girls-against-violence-female-empowerment-women-safety-gender-equality-provide-security-silhouette-symbol-on-white-space-isolated-illustration-vector.png"
          alt="User Avatar"
          className="w-20 h-20 mx-auto mb-6"
        />
        <ul className="space-y-4 text-pink-700">
          <li
            className="flex items-center space-x-4 cursor-pointer"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
          </li>
          <li
            className="flex items-center space-x-4 cursor-pointer"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={faCog} />
            <span>Settings</span>
          </li>
          <li
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() => {
              handleNotifications();
              toggleMenu();
            }}
          >
            <FontAwesomeIcon icon={faBell} />
            <span>Notification</span>
          </li>
          <li
            className="flex items-center space-x-4 cursor-pointer"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            <span>About Us</span>
          </li>
          <li
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() => {
              handleLogout();
              toggleMenu();
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SlidingMenu;
