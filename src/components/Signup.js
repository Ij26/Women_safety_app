import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("Female");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState(""); 
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
      phoneNo: mobile,
      gender,
    };

    try {
  
      const response = await axios.post("http://localhost:5000/api/v1/user/signup", userData);
      
      if (response.status === 201) {
        alert("Sign-up successful! You can now log in.");
        navigate("/login");
      } else {
        alert("Signup failed, please try again.");
      }
    } catch (err) {
      console.error(err.message);
      alert("An error occurred during signup.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-200">
      <div className="bg-white rounded-tl-3xl rounded-br-3xl shadow-lg p-6 max-w-xs w-full">
        <h2 className="text-2xl font-bold text-pink-700 mb-4">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            className="mb-4 p-2 w-full border border-gray-300 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="mb-4 p-2 w-full border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 p-2 w-full border border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select
            className="mb-4 p-2 w-full border border-gray-300 rounded-md"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Mobile Number"
            className="mb-4 p-2 w-full border border-gray-300 rounded-md"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-700"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <span
            className="text-pink-700 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;