import React from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';

const Activities = () => {
  const { id } = useParams();

  return (
    <>
      
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4"> Activities</h2>
        <p>Welcome User #{id}! Here's a list of your recent activities. (Coming soon...)</p>
      </div>
    </>
  );
};

export default Activities;
