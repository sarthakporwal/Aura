import React from 'react';
import TimelineComponent from './TimelineComponent';
import Navbar from './Navbar';

function ProfileDash() {
  return (
    <div className='w-screen h-screen bg-zinc-900 white-text' >
      <Navbar />
      <TimelineComponent />
    </div>
  );
}

export default ProfileDash;