import React, { useEffect, useState } from "react";

const apiKey = "AIzaSyAtWt9ACf5HMAIoMxxvM6BVoPNaLnzJ1gc"; // Replace with your API key

function PoliceMap() {
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  useEffect(() => {
    // Load the Google Maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      initMap();
    };
  }, []);

  const initMap = () => {
    // Get user's current location
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      // Initialize map
      const mapInstance = new window.google.maps.Map(
        document.getElementById("map"),
        {
          center: userLocation,
          zoom: 14,
        }
      );

      // Create a blue marker for the user's current location
      new window.google.maps.Marker({
        position: userLocation,
        map: mapInstance,
        title: "You are here",
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Blue marker icon
      });

      // Set up Directions and Places services
      const directionsServiceInstance = new window.google.maps.DirectionsService();
      const directionsRendererInstance = new window.google.maps.DirectionsRenderer();
      directionsRendererInstance.setMap(mapInstance);

      setMap(mapInstance);
      setDirectionsService(directionsServiceInstance);
      setDirectionsRenderer(directionsRendererInstance);

      // Search for nearby police stations
      const service = new window.google.maps.places.PlacesService(mapInstance);
      const request = {
        location: userLocation,
        radius: "5000", // Search within 5km radius
        type: ["police"],
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          // Show directions to the nearest 5 police stations
          const waypoints = results.slice(0, 5).map((place) => ({
            location: place.geometry.location,
            stopover: true,
          }));

          const directionsRequest = {
            origin: userLocation,
            destination: userLocation, // Loop back to the user's location
            waypoints: waypoints,
            optimizeWaypoints: true,
            travelMode: window.google.maps.TravelMode.DRIVING,
          };

          directionsServiceInstance.route(
            directionsRequest,
            (response, status) => {
              if (status === window.google.maps.DirectionsStatus.OK) {
                directionsRendererInstance.setDirections(response);
              } else {
                console.error("Directions request failed due to " + status);
              }
            }
          );
        }
      });
    });
  };

  return (

    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-200 relative">
    <div className="relative w-full max-w-xs">
    <div className="bg-white h-[556px] w-[272px] rounded-tl-3xl rounded-br-3xl shadow-lg p-6">
      <h2 className="text-center text-xl font-bold mb-4">
        Nearest Police Stations
      </h2>
      <div id="map" style={{ height: "90%", width: "100%" }}></div>
    </div>
    </div>
    </div>
  );
}

export default PoliceMap;