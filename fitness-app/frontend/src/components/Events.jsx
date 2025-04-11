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
  const [distance, setDistance] = useState(0);

  const timerRef = useRef(null);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        });
        const data = await res.json();
        console.log("Events fetched: ", data);
        setEvents(data.events);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Handle event change
  const handleEventChange = (e) => {
    const eventId = e.target.value;
    const event = events.find(ev => ev.id.toString() === eventId);
    if (!event) {
      setSelectedEvent(null);
      setUnits([]);
      return;
    }
    setSelectedEvent(event);
    setSelectedUnit("");
    setUnits(event.unit.split(",").map(u => u.trim()));
  };

  // Timer logic
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

  // Save record to backend
  const handleSaveRecord = async () => {
    if (!selectedEvent || !selectedUnit || time === 0) {
      alert("Please complete all fields and ensure timer has run.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/activities/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          event_id: selectedEvent.id,
          duration: time,
          distance: distance,
        }),
      });

      const data = await response.json();
      console.log("Saved Activity:", data);
      
      if (response.ok) {
        alert("Activity saved successfully!");
        setSelectedEvent(null);
        setSelectedUnit(null);
        setUnits([]);
        setDistance(0);
        resetTimer();
      } else {
        alert("Error saving activity.");
      }
    } catch (error) {
      console.error("Save Record Error:", error);
      alert("Error saving activity.");
    }
  };

  return (
    <>
      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Events</h2>
        <p className="mb-6">Hello User #{id}! Track your activity below.</p>

        {/* Event Dropdown */}
        <label className="block mb-2 font-semibold">Select Event</label>
        <select id="eventSelect" name="event" onChange={handleEventChange} className="w-full mb-4 p-2 border rounded">
          <option value="">-- Choose an event --</option>
          {Array.isArray(events) && events.map(event => ( //check if events is an array ...and so u wount get the map arry abh ..!
            <option key={event.id} value={event.id}>{event.name}</option>
          ))}
        </select>

        {/* Unit Dropdown */}
        {units.length > 0 && (
          <>
            <label className="block mb-2 font-semibold">Select Unit</label>
            <select value={selectedUnit} onChange={e => setSelectedUnit(e.target.value)} className="w-full mb-4 p-2 border rounded">
              <option value="">-- Choose unit --</option>
              {units.map((unit, index) => (
                <option key={index} value={unit}>{unit}</option>
              ))}
            </select>
          </>
        )}

        {/* Distance Input */}
        {selectedEvent && selectedUnit && (
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Distance ({selectedUnit})</label>
            <input
              type="number"
              placeholder={`Enter distance in ${selectedUnit}`}
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
        )}

        {/* Timer UI */}
        {selectedEvent && selectedUnit && (
          <div className="text-center">
            <div className="text-3xl font-mono mb-4">{formatTime()}</div>
            <div className="space-x-2 mb-4">
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

            {/* Save Record Button */}
            <div className="mt-4">
              <button
                onClick={handleSaveRecord}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save Record
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Events;
