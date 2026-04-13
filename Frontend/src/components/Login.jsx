import React, { useState } from "react";
import logo from "../assets/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/login`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      toast.success(response.data.message);

      // ✅ FIXED STORAGE
      localStorage.setItem(
        "user",
        JSON.stringify({ token: response.data.token }),
      );

      navigate("/");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.errors || "Login failed!!!");
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-black to-blue-950">
      <div className="h-screen container mx-auto flex items-center justify-center text-white">
        <header className="absolute top-0 left-0 w-full flex justify-between p-5">
          <div className="flex items-center space-x-2">
            <img src={logo} className="w-10 h-10 rounded-full" />
            <Link to="/" className="text-xl font-bold text-orange-500">
              SkillZo
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/signup" className="border px-4 py-2 rounded-md">
              Signup
            </Link>
            <Link to="/courses" className="bg-orange-500 px-4 py-2 rounded-md">
              Join now
            </Link>
          </div>
        </header>

        <div className="bg-gray-900 p-8 rounded-lg w-[400px] mt-20">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-3 bg-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 bg-gray-800 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <button className="w-full bg-orange-500 p-3 mt-3">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
