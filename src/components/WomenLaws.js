import React from "react";
import { useNavigate } from "react-router-dom";

function WomenLaws() {
  const navigate = useNavigate();

  const laws = [
    "The Prohibition of Child Marriage Act, 2006",
    "Special Marriage Act, 1954",
    "Dowry Prohibition Act, 1961",
    "Indian Divorce Act, 1969",
    "Maternity Benefit Act, 1861",
    "Medical Termination of Pregnancy Act, 1971",
    "Sexual Harassment of Women at Workplace Act, 2013",
    "Equal Remuneration Act, 1976",
    "The Criminal Law (Amendment) Act, 2013",
    "Protection of Women from Domestic Violence Act, 2005",
  ];

  const handleLawClick = (law) => {
    navigate(`/law-detail/${law}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-200">
      <div className="bg-white rounded-tl-3xl rounded-br-3xl shadow-lg p-6 max-w-xs w-full">
        <h2 className="text-xl font-bold mb-4">Basic Laws for Women!</h2>
        <ul className="space-y-4">
          {laws.map((law, index) => (
            <li
              key={index}
              className="law-button bg-green-100 p-4 rounded-lg shadow-md text-gray-700 text-lg cursor-pointer"
              onClick={() => handleLawClick(law)}
            >
              {law}
            </li>
          ))}
        </ul>
        <button
          onClick={() => navigate(-1)}
          className="back-button mt-4 bg-blue-500 text-white text-lg p-2 rounded-md"
        >
          BACK
        </button>
      </div>
    </div>
  );
}

export default WomenLaws;
