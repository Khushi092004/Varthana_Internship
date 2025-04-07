import React from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';

const Events = () => {
  const { id } = useParams();

  return (
    <>
      
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4"> Events</h2>
        <p>Hello User #{id}! Check out upcoming and past events. (Coming soon...)</p>
      </div>
    </>
  );
};

export default Events;
