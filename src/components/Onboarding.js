import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const onboardingSteps = [
  {
    id: 1,
    title: "Welcome",
    description:
      "She Raksha is all about women safety. This app is designed to ensure your safety, at all times. Stay positive with us.",
    imageUrl:
      "https://morbiupdate.com/wp-content/uploads/2022/04/women-protection-black-glyph-icon-protect-girls-against-violence-female-empowerment-women-safety-gender-equality-provide-security-silhouette-symbol-on-white-space-isolated-illustration-vector.png", // Replace with actual path or URL
  },
  {
    id: 2,
    title: "Emergency Alert",
    description:
      "Emergency alert functionality can call and send nortification on saved contacts, if stuck in a panic situation.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0FdAYHxjI2KoE3QfgK3UcP_fZMp44a8i1mA&s", // Replace with actual path or URL
  },
  {
    id: 3,
    title: "Live Directions Feature",
    description:
      "In cases of potential harassment, assault, or dangerous situations, discreetly capturing images or videos can serve as valuable evidence for law enforcement or legal proceedings.",
    imageUrl:
      "https://images.deccanherald.com/deccanherald%2Fimport%2Fsites%2Fdh%2Ffiles%2Farticle_images%2FGoogle%20Maps%20glanceable%20directions%20feature.jpg?w=1200", // Replace with actual path or URL
  },
  {
    id: 4,
    title: "Share Location",
    description:
      "On emergency situations, easily share your live location with our friends, family, and closed ones.",
    imageUrl:
      "https://img.freepik.com/premium-vector/gps-navigation-concept-tiny-girl-search-location-smartphone-online-map-we-have-moved_501813-165.jpg", // Replace with actual path or URL
  },
];

function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNextClick = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/login"); // Redirect to login/signup page after the last step
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-200">
      <div className="bg-white rounded-tl-3xl rounded-br-3xl shadow-lg p-6 max-w-md w-full">
        <img
          src={onboardingSteps[currentStep].imageUrl}
          alt={onboardingSteps[currentStep].title}
          className="w-full h-auto mb-6"
        />
        <h2 className="text-2xl font-bold text-pink-700 mb-4">
          {onboardingSteps[currentStep].title}
        </h2>
        <p className="text-gray-700 mb-6">
          {onboardingSteps[currentStep].description}
        </p>
        <div className="flex justify-end">
          <button
            onClick={handleNextClick}
            className="bg-pink-500 text-white text-lg font-bold py-2 px-4 rounded-md shadow-md hover:bg-pink-700"
          >
            {currentStep === onboardingSteps.length - 1 ? "Start" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
