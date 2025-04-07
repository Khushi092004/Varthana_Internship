import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { id } = useParams();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth or localStorage logic here if any
    alert('✅ Logged out!');
    navigate('/');
  };

  return (
    <nav className="bg-green-600 p-4 text-white flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to={`/dashboard/${id}`}>MyDashboard</Link>
      </div>

      <div className="flex items-center space-x-6">
        <Link to={`/dashboard/${id}/activities`} className="hover:underline">Activities</Link>
        <Link to={`/dashboard/${id}/events`} className="hover:underline">Events</Link>
        <Link to={`/dashboard/${id}/friends`} className="hover:underline">Friends</Link>

        {/* Profile Icon & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="focus:outline-none"
          >
            <span className="text-2xl">👤</span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 bg-white text-black shadow-md rounded w-40 z-10">
              <Link
                to={`/dashboard/${id}/about`}
                className="block px-4 py-2 hover:bg-gray-100 border-b"
                onClick={() => setShowDropdown(false)}
              >
                ℹ️ About
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
