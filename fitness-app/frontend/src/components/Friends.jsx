import React from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';

const Friends = () => {
  const { id } = useParams();

  return (
    <>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4"> Friends</h2>
        <p>Hey User #{id}, see who your buddies are! (Coming soon...)</p>
      </div>
    </>
  );
};

export default Friends;
