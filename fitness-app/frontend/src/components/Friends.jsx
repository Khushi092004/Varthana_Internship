import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { getToken } from "../utils/tokenHelper";
import { useNavigate } from "react-router-dom";


const Friends = () => {
  const { id } = useParams(); // Current logged-in user ID
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchFriendData = async () => {
      try {
        const token = getToken();
        console.log("Token being sent:", token);
          if (!token) {
            alert("No token found. Please login again.");
            navigate("/");
            return;
          }

        const resFriends = await axios.get(`/api/friends/friends`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const friendsData = Array.isArray(resFriends.data)
        ? resFriends.data
        : resFriends.data.friends || [];
        setFriends(friendsData);

        const resPending = await axios.get(`/api/friends/pending-requests`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPendingRequests(Array.isArray(resPending.data) ? resPending.data : []);

        //randommwale
        console.log(" Fetching /api/users/random...");
        const resUsers = await axios.get(`/api/users/random`, {
          headers: { Authorization: `Bearer ${token}` }
          
        });
        console.log(" Response from /api/users/random:", resUsers.data);

        // Handle response structure
        const usersData = Array.isArray(resUsers.data)
          ? resUsers.data
          : Array.isArray(resUsers.data.users)
          ? resUsers.data.users
          : [];
        
          // Filter users to exclude the current logged-in user
        const otherUsers = usersData.filter(user => user.id !== parseInt(id));
        setUsers(otherUsers);
      } catch (error) {
        console.error('Error fetching friend data:', error);
      }
    };

    fetchFriendData();
  }, [id, navigate]);

  const acceptRequest = async (requesterId) => {
    try {
      const token = getToken();
      await axios.post(`/api/friends/accept-request`, { requester_id: requesterId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setPendingRequests(prev => prev.filter(req => req.requester_id !== requesterId));
      
      // Optionally re-fetch the friends list
    } catch (err) {
      console.error('Error accepting request:', err);
    }
  };

  const rejectRequest = async (requesterId) => {
    try {
      const token = getToken();
      await axios.post(`/api/friends/reject-request`, { requester_id: requesterId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPendingRequests(prev => prev.filter(req => req.requester_id !== requesterId));
    } catch (err) {
      console.error('Error rejecting request:', err);
    }
  };

  const sendFriendRequest = async (receiverId) => {
    try {
      const token = getToken();
      console.log("Sending friend request to receiver_id:", receiverId);

      await axios.post(`/api/friends/send-request`, { receiver_id: receiverId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Friend request sent!');
    } catch (err) {
      console.error('Error sending request:', err);
    }
  };


  return (
    <>
      
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Friends Dashboard</h2>

        {/* Friends List */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Your Friends</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {friends.length > 0 ? (
              friends.map(friend => (
                <div key={friend.id} className="p-4 border rounded-lg shadow-md">
                  <p className="font-medium">{friend.username}</p>
                  <p className="text-sm text-gray-500">{friend.email}</p>
                </div>
              ))
            ) : (
              <p>No friends yet. Go make some connections!</p>
            )}
          </div>
        </section>

        {/* Pending Requests */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Pending Friend Requests</h3>
          <div className="space-y-4">
            {pendingRequests.length > 0 ? (
              pendingRequests.map(request => (
                <div key={request.requester_id} className="flex items-center justify-between border p-4 rounded shadow-sm">
                  <div>
                    <p className="font-medium">{request.requester_username}</p>
                    <p className="text-sm text-gray-500">{request.requester_email}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => acceptRequest(request.requester_id)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => rejectRequest(request.requester_id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No pending requests.</p>
            )}
          </div>
        </section>

        {/* Random Suggestions to Send Requests */}
        <section>
          <h3 className="text-xl font-semibold mb-2">People You May Know</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.length > 0 ? (
              users.map(user => (
                <div key={user.id} className="p-4 border rounded-lg shadow">
                  <p className="font-medium">{user.username}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <button
                    onClick={() => sendFriendRequest(user.id)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Send Request
                  </button>
                </div>
              ))
            ) : (
              <p>No users available to send requests.</p>
            )}
          </div>
        </section>

        <button
          onClick={() => window.location.reload()}
          className="mb-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          🔁 Refresh Suggestions
        </button>
      </div>
    </>
  );
};

export default Friends;
