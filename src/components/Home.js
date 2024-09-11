import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faExclamationTriangle,
  faMapMarkerAlt,
  faShieldAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import SlidingMenu from "./SlidingMenu"; // Import the sliding menu component
import "../App.css"; // Assuming styles are handled here
import { webSocketAtom } from "../store/atoms/atom";
import { useRecoilValue } from "recoil";
import axios from "axios"; 



function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [maleCount, setMaleCount] = useState(null);
  const [femaleCount, setFemaleCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const socket= useRecoilValue(webSocketAtom);
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleParentsClick = () => {
    navigate("/parents-options");
  };

  useEffect(() => {
    const fetchNearbyData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/user/find-nearby");
        const data = await response.json();


        setMaleCount(data.genderCounts.male);
        setFemaleCount(data.genderCounts.female);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the data", error);
        setLoading(false);
      }
    };

    fetchNearbyData();
  }, []);

  


    // Handle WebSocket connection open event

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-200 relative">
      <div className="relative w-full max-w-xs">
        <div className="absolute top-4 right-4">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="text-3xl text-pink-700 cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
        <div className="bg-white rounded-tl-3xl rounded-br-3xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-pink-700 mb-4">She Raksha</h1>
          <div className="mb-6">
            <img
              src="https://morbiupdate.com/wp-content/uploads/2022/04/women-protection-black-glyph-icon-protect-girls-against-violence-female-empowerment-women-safety-gender-equality-provide-security-silhouette-symbol-on-white-space-isolated-illustration-vector.png"
              alt="Group holding hands"
              className="w-full h-auto"
            />
          </div>

          {/* Display the male and female count */}
          <div className="text-center mb-6">
            {loading ? (
              <p>Loading nearby gender ratio...</p>
            ) : (
              <div className="bg-white p-4 rounded-lg shadow-md border-2 border-pink-200">
                <h2 className="text-xl font-bold text-pink-700 mb-2">
                  Nearby Gender Ratio
                </h2>
                <div className="flex justify-around">
                  <div className="bg-pink-100 p-4 rounded-lg shadow-sm w-1/3">
                    <p className="text-sm font-semibold text-gray-600">
                      Male Count
                    </p>
                    <p className="text-2xl font-bold text-pink-600">
                      {maleCount ?? "N/A"}
                    </p>
                  </div>
                  <div className="bg-pink-100 p-4 rounded-lg shadow-sm w-1/3">
                    <p className="text-sm font-semibold text-gray-600">
                      Female Count
                    </p>
                    <p className="text-2xl font-bold text-pink-600">
                      {femaleCount ?? "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>


          <div className="grid grid-cols-2 gap-6 mb-6">
            <button 
             onClick={() => navigate("/contacts")}
             className="button bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-pink-600">
              <FontAwesomeIcon icon={faAddressBook} className="text-3xl mb-2" />
              Contacts
            </button>
            <button
              onClick={() => navigate("/alert-options")}
              className="button bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-pink-600"
            >
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                className="text-3xl mb-2"
              />
              Alert
            </button>
            <button
              onClick={() => navigate("/location-options")}
              className="button bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-pink-600"
            >
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-3xl mb-2"
              />
              Location
            </button>
            <button
              onClick={handleParentsClick}
              className="button bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-pink-600"
            >
              <FontAwesomeIcon icon={faShieldAlt} className="text-3xl mb-2" />
              Safety
            </button>
          </div>
          <div className="flex justify-center">
            <button onClick={async()=>{
              if(socket){
                const message={
                  "action":"panic"
                }
                socket.send(JSON.stringify(message));
              }else{
                console.log('socket khali hai')
              }
              // add send sms also   
              try {
                const response = await axios.post("http://localhost:5000/api/v1/user/send-sms", {
                  userId, 
                });

                const result = response.data;
                console.log(result.msg); // Log the success message
              } catch (error) {
                console.error("Failed to send SMS", error);
              }
            }} className="button bg-pink-500 text-white text-xl font-bold py-3 px-8 rounded-full shadow-lg">
              PANIC
            </button>
          </div>
        </div>
      </div>

      {/* Include the sliding menu */}
      <SlidingMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </div>
  );
}

export default Home;
