import React, { useState,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState,useRecoilValue, useSetRecoilState } from "recoil";
import { directionAtom, intervalIdAtom, locationAtom, LoginCheck,notificationAtom, webSocketAtom } from "../store/atoms/atom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [intervalId,setIntervalId]=useRecoilState(intervalIdAtom);
  const setNotification= useSetRecoilState(notificationAtom);
  const [isLogin,setLogin]=useRecoilState(LoginCheck);
  const setDirection= useSetRecoilState(directionAtom)
  const setSocket= useSetRecoilState(webSocketAtom);

  let socket=null;
  if(isLogin){
    console.log("establishing connection")
    socket = new WebSocket(
      `ws://localhost:5173?userId=${localStorage.getItem("userId")}`
    );
    setSocket(socket);
    socket.onopen=()=>{
      console.log("socket connected");
    }
    socket.onmessage=(event)=>{
      const data= JSON.parse(event.data);
      console.log(data);
      if(data.type === 'help'){
        const entry={
          victimId: data.victimId,
          name: data.name,
          location: data.location,
          timestamp: new Date().toISOString()
        }
        
        setNotification((prevNotifications) => [
          ...prevNotifications, // Spread existing notifications
          entry // Add the new notification
        ]);
        navigate('/notifications');
      }
    }
  }else{
    console.log("socket not connected");
  }
  

  useEffect(() => {
    console.log("reload");
    if(intervalId){
      clearInterval(intervalId);
      setIntervalId(null);
    } 

    if (isLogin) {
        const userId = isLogin;
        const  interval = setInterval(async () => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              };

              const message= JSON.stringify({
                action:"updateLocation",
                latitude: location.latitude,
                longitude: location.longitude
              })
              setDirection({
                latitude: location.latitude,
                longitude:location.longitude
              })
              if(socket && socket.readyState=== WebSocket.OPEN){
                socket.send(message);
              }
              
              console.log("Current Location:", location);
            },
            (error) => {
              console.error("Error getting location:", error);
            }
          );
        }, 3000);

        setIntervalId(interval);
    }
  }, [isLogin]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        // Send login request to the backend using axios
        const response = await axios.post("http://localhost:5000/api/v1/user/login", {
          email,
          password,
        }); 

        const data = response.data;
        console.log(data);

        
        if (response.status === 201) {
          // Store login state and userId in local storage
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userId", data.userId);
          setLogin(localStorage.getItem('userId'));

          // Connect to WebSocket and send location data

          // Redirect to home page
          navigate("/home");
        } else {
          alert(data.error || "Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login");
      }
    } else {
      alert("Please fill in all fields");
    }
  };


  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-200">
      <div className="bg-white rounded-tl-3xl rounded-br-3xl shadow-lg p-6 max-w-xs w-full">
        <h2 className="text-2xl font-bold text-pink-700 mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-pink-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-pink-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white text-lg font-bold py-2 px-4 rounded-md shadow-md hover:bg-pink-700"
          >
            Login
          </button>
        </form>
        <p className="text-center text-pink-700 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="cursor-pointer text-pink-500 underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;