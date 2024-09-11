import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Assuming styles are handled here

function ParentsOptions() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-200">
      <div className="bg-white rounded-tl-3xl rounded-br-3xl shadow-lg p-6 max-w-xs w-full">
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigate("/self-defence")}
            className="bg-green-100 p-4 rounded-lg shadow-md text-gray-700 text-lg text-center"
          >
            Self Defence
          </button>
          <button
            onClick={() => navigate("/women-laws")}
            className="bg-green-100 p-4 rounded-lg shadow-md text-gray-700 text-lg text-center"
          >
            Women Laws
          </button>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 text-white text-lg p-2 rounded-md"
        >
          BACK
        </button>
      </div>
    </div>
  );
}

export default ParentsOptions;
