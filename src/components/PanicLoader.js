import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const messages = ["Contacting people", "People on the way", "We are helping"];

function PanicLoader() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) =>
        prevIndex === messages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Changes message every 2 seconds

    // Automatically navigate back to home after 10 seconds
    const timeout = setTimeout(() => {
      navigate("/home");
    }, 10000); // 10 seconds before returning to home

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-200">
      <div className="flex flex-col items-center">
        {/* Spinner Icon */}
        <FontAwesomeIcon
          icon={faSpinner}
          className="text-pink-600 text-4xl animate-spin mb-4"
        />

        {/* Rotating messages */}
        <p className="text-xl font-semibold text-pink-700">
          {messages[currentMessageIndex]}
        </p>
      </div>
    </div>
  );
}

export default PanicLoader;