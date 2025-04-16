import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/tokenHelper";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [events, setEvents] = useState([]); // events table se aayenge
  const [selectedEvent, setSelectedEvent] = useState("All");



  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = getToken();
        const res = await axios.get("http://localhost:5000/api/activities/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Activities fetched:", res.data.activities); 
        setActivities(res.data.activities || []);
      } catch (err) {
        console.error("Error fetching activities:", err);
      }
    };

    fetchActivities();
  }, []);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = getToken();
        const res = await axios.get("http://localhost:5000/api/events/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Events fetched:", res.data.events);
        setEvents(res.data.events); 
        
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
  
    fetchEvents();
  }, []);

  
  const filteredActivities =
  selectedEvent === "All"
    ? activities
    : activities.filter((act) => act.event_name === selectedEvent);


    if (!activities || !events) return <div>Loading...</div>;
    
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My Activities</h2>

      {/*Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          className={`px-4 py-1 rounded-full border ${
            selectedEvent === "All"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setSelectedEvent("All")}
        >
          All
        </button>

        {events.map((event) => (
          <button
            key={event._id} 
            className={`px-4 py-1 rounded-full border ${
              selectedEvent === event.name
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedEvent(event.name)}
          >
            {event.name}
          </button>
        ))}
      </div>

        {/*Activity Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        
        {filteredActivities.map((activity,index) => (
          <div
            key={activity.id || activity._id || index} //fall back
            className="bg-white shadow-md rounded-lg p-4 border"
          >
            <h3 className="text-lg font-bold text-blue-600">
              {activity.event_name}
            </h3>
            <p>
              <strong>Duration:</strong> {activity.duration} mins
            </p>
            <p>
              <strong>Distance:</strong> {activity.distance} {activity.unit}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Recorded:</strong>{" "}
              {new Date(activity.recorded_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
