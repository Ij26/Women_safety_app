import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "../App.css"; // Assuming styles are handled here
import { APIProvider, Map, useMapsLibrary, useMap } from "@vis.gl/react-google-maps";

const Panic = () => {
    
    const location= useLocation();
    console.log(location);
    const data=location.state.props;
    
    // const position = { lats: 43.6532, lng: -79.3832 }; // Initial position
    const [zoom, setZoom] = useState(9);

    // Example coordinates
    const origin = { lat: data.origin.latitude , lng: data.origin.longitude }; // Toronto
    const destination = { lat: data.destination[1], lng: data.destination[0] }; // Another location in Toronto

    // const origin = { lat: data.origin.latitude , lng: data.origin.longitude }; // Toronto
    // const destination = { lat: 28.6009479, lng: 77.3460705 }; // Another location in Toronto

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-pink-200 relative">
            <div className="relative w-full max-w-xs">
                <div className="bg-white h-[556px] w-[272px] rounded-tl-3xl rounded-br-3xl shadow-lg p-6">
                    <APIProvider apiKey="AIzaSyAtWt9ACf5HMAIoMxxvM6BVoPNaLnzJ1gc">
                        <Map
                            style={{ width: '100%', height: '60%' }}
                            onZoomChanged={(newZoom) => setZoom(newZoom)} // Handle zoom changes
                            mapId="6a337738e5db55bc"
                            fullscreenControl={false}
                        >
                            <Directions origin={origin} destination={destination} />
                        </Map>
                    </APIProvider>
                </div>
            </div>
        </div>
    );
}

function Directions({ origin, destination }) {
    const map = useMap();
    const navigate = useNavigate();
    const routesLibrary = useMapsLibrary("routes");
    const [directionsService, setDirectionService] = useState();
    const [directionsRenderer, setDirectionRenderer] = useState();
    const [routes, setRoutes] = useState([]);
    const [routeIndex, setRouteIndex] = useState(0);
    const selected = routes[routeIndex];
    const leg = selected?.legs[0];

    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionService(new routesLibrary.DirectionsService());
        setDirectionRenderer(new routesLibrary.DirectionsRenderer({ map }));
    }, [routesLibrary, map]);

    useEffect(() => {
        if (!directionsRenderer || !directionsService) return;

        directionsService.route({
            origin: new window.google.maps.LatLng(origin.lat, origin.lng),
            destination: new window.google.maps.LatLng(destination.lat, destination.lng),
            travelMode: window.google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true,
        }).then(response => {
            directionsRenderer.setDirections(response);
            setRoutes(response.routes);
        }).catch(error => {
            console.error("Directions request failed:", error);
        });
    }, [directionsService, directionsRenderer, origin, destination]);

    useEffect(() => {
        if (!directionsRenderer) return;
        directionsRenderer.setRouteIndex(routeIndex);
    }, [routeIndex, directionsRenderer]);

    if (!leg) return null;

    return (
        <div className="directions">
            <h2>{selected.summary}</h2>
            <p>{leg.start_address.split(',')[0]} to {leg.end_address.split(',')[0]}</p>
            <p>Distance: {leg.distance?.text}</p>
            <p>Duration: {leg.duration?.text}</p>

            <h2>Other Routes</h2>
            <ul>
                {routes.map((route, index) => (
                    <li key={route.summary}>
                        <button onClick={() => setRouteIndex(index)}>{route.summary}</button>
                    </li>
                ))}
            </ul>
            <button
          onClick={() => navigate("/home")}
          className="mt-4 bg-blue-500 text-white text-lg p-2 rounded-md"
        >
          BACK
        </button>
        </div>
    );
}

export default Panic;
