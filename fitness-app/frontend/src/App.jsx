import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Activities from "./components/Activities";
import Events from "./components/Events";
import Friends from "./components/Friends";
import About from "./components/About";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/DashboardLayout"; // <- yeh naya import

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      <Route path="/dashboard/:id" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="activities" element={<Activities />} />
        <Route path="events" element={<Events />} />
        <Route path="friends" element={<Friends />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
};

export default App;
