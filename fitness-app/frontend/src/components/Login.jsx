import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const err = {};
    if (!email) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) err.email = "Invalid email format";

    if (!password) err.password = "Password is required";
    else if (password.length < 6) err.password = "Minimum 6 characters required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        // Store token in localStorage/sessionStorage
        localStorage.setItem("token", data.token);
        navigate(`/dashboard/${data.user.id}`);

      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md w-full max-w-sm shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-1 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mt-3 mb-1 border rounded"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>

        <div className="flex justify-between text-sm mt-3">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</Link>
          <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
