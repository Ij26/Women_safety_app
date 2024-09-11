import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Assuming styles are handled here

function LocationOptions() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-200">
      <div className="bg-white rounded-tl-3xl rounded-br-3xl shadow-lg p-6 max-w-xs w-full">
        <h1 className="text-xl font-bold text-green-700 mb-4">
          Location Options
        </h1>
        <div className="grid grid-cols-1 gap-4">
          <button
            className="location-button bg-green-300 p-4 rounded-lg shadow-md flex justify-between items-center text-green-700 w-full hover:bg-green-400"
            onClick={() => navigate("/police-map")}
          >
            Police Station
            <i className="fas fa-phone-alt"></i>
          </button>
          <button
            className="location-button bg-green-300 p-4 rounded-lg shadow-md flex justify-between items-center text-green-700 w-full hover:bg-green-400"
            onClick={() => navigate("/hospital-map")}
          >
            Hospital
            <i className="fas fa-phone-alt"></i>
          </button>
          <button
            className="location-button bg-green-300 p-4 rounded-lg shadow-md flex justify-between items-center text-green-700 w-full hover:bg-green-400"
            onClick={() => navigate("/metro-map")}
          >
            Metro Stations
            <i className="fas fa-phone-alt"></i>
          </button>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white text-lg p-2 rounded-md shadow-lg"
          >
            BACK
          </button>
        </div>
      </div>
    </div>
  );
}

export default LocationOptions;