import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { directionAtom, notificationAtom } from "../store/atoms/atom";

const Notifications = () => {
  const notifications= useRecoilValue(notificationAtom);
  const curr_location= useRecoilValue(directionAtom);
  const navigate = useNavigate();

  const handleAccept = (destination) => {
    const props={
      origin: curr_location,
      destination: destination
    }
    navigate("/panic",{state: {props}});
  };

  const handleIgnore = () => {
    navigate("/home");
  };


  useEffect(()=>{

  },[notifications]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-200">
      <div className="bg-white h-[556px] w-[272px] rounded-tl-3xl rounded-br-3xl shadow-lg p-6 overflow-auto">  
      {notifications.length === 0 ? (
        <div className="bg-red-100 rounded-lg shadow-lg p-6 max-w-md w-full mb-4"
          >
            <h2 className="text-xl font-bold mb-2">No new notifications</h2>
            <p className="text-gray-700 mb-4"></p>
            </div>
      ) : (
        notifications.map((notification, index) => (
          <div
            key={index}
            className="bg-red-100 rounded-lg shadow-lg p-6 max-w-md w-full mb-4 "
          >
            <h2 className="text-xl font-bold mb-2">Help Required</h2>
            <p className="text-gray-700 mb-4">
            Urgent: Immediate Assistance Required for {notification.name}
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleAccept(notification.location.coordinates)}
                className="bg-green-500 text-white p-2 rounded-lg"
              >
                Accept
              </button>
              <button
                onClick={handleIgnore}
                className="bg-gray-500 text-white p-2 rounded-lg"
              >
                Ignore
              </button>
            </div>
          </div>
        ))
      )}
    </div>
    </div>
  );
};

export default Notifications;
