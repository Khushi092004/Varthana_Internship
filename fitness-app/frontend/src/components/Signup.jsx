import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", age: "", mobileNo: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const err = {};
    if (!form.username) err.username = "Username is required";
    if (!form.email) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) err.email = "Invalid email";
    if (!form.password) err.password = "Password is required";
    else if (form.password.length < 6) err.password = "Minimum 6 characters";
    if (!form.age) err.age = "Age is required";
    if (!form.mobileNo) err.mobileNo = "Mobile number is required";
    else if (!/^\d{10}$/.test(form.mobileNo)) err.mobileNo = "Invalid mobile number";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = {
      username: form.username,
      email: form.email,
      password: form.password,
      age: form.age,
      mobileNo: form.mobileNo,
    };

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert(" Signup successful!");
        navigate(`/dashboard/${data.user.id}`);

      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert(" An error occurred during signup.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md w-full max-w-sm shadow-md">
       
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 mb-1 border rounded"
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 mt-3 mb-1 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 mt-3 mb-1 border rounded"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <input
            name="age"
            placeholder="Age"
            type="number"
            value={form.age}
            onChange={handleChange}
            className="w-full p-2 mt-3 mb-1 border rounded"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}

          <input
            name="mobileNo"
            placeholder="Mobile Number"
            type="tel"
            value={form.mobileNo}
            onChange={handleChange}
            className="w-full p-2 mt-3 mb-1 border rounded"
          />
          {errors.mobileNo && <p className="text-red-500 text-sm">{errors.mobileNo}</p>}


        <button className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Signup
        </button>

        <p className="text-sm text-center mt-3">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
