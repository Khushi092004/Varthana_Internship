import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) setError("Email is required");
    else if (!/\S+@\S+\.\S+/.test(email)) setError("Invalid email");
    else {
      setError("");
      setSuccess("Password reset link sent to your email ✅");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md w-full max-w-sm shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
            setSuccess("");
          }}
          className="w-full p-2 mb-1 border rounded"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button className="w-full mt-4 bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
