import React, { useEffect, useState } from "react";
import axios from "axios";

const About = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token);

        const res = await axios.get("http://localhost:5000/auth/me",{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setUser(res.data.user);
        console.log("User Data:", res.data.user);

      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <p>Loading user info...</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Welcome, {user.username}!</h2>
      <p><strong> Email:</strong> {user.email}</p>
      <p><strong> Age:</strong> {user.age}</p>
      <p><strong> Mobile:</strong> {user.mobile_no}</p>
    </div>
  );
};

export default About;
