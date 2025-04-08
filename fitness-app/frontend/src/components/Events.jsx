import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';

const Events = () => {
  const { id } = useParams();

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  //  Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        });
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  //  Event selection changes
  const handleEventChange = (e) => {
    const eventId = e.target.value;
    const event = events.find(ev => ev.id.toString() === eventId);
    setSelectedEvent(event);
    setSelectedUnit("");
    setUnits(event.unit.split(",").map(u => u.trim()));
  };

  //  Timer logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const formatTime = () => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <>
      
      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Events</h2>
        <p className="mb-6">Hello User #{id}! Track your activity below.</p>

        {/* Event Dropdown */}
        <label className="block mb-2 font-semibold">Select Event</label>
        <select onChange={handleEventChange} className="w-full mb-4 p-2 border rounded">
          <option value="">-- Choose an event --</option>
          {events.map(event => (
            <option key={event.id} value={event.id}>{event.name}</option>
          ))}
        </select>

        {/* Unit Dropdown */}
        {units.length > 0 && (
          <>
            <label className="block mb-2 font-semibold">Select Unit</label>
            <select value={selectedUnit} onChange={e => setSelectedUnit(e.target.value)} className="w-full mb-6 p-2 border rounded">
              <option value="">-- Choose unit --</option>
              {units.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </>
        )}

        {/* Timer UI */}
        {selectedEvent && selectedUnit && (
          <div className="text-center">
            <div className="text-3xl font-mono mb-4">{formatTime()}</div>
            <div className="space-x-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {isRunning ? "Pause" : "Start"}
              </button>
              <button
                onClick={() => setIsRunning(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Stop
              </button>
              <button
                onClick={resetTimer}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Events;
