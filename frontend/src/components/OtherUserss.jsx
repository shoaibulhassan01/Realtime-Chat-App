import React from 'react';
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { useSelector } from 'react-redux';

function OtherUserss() {
  useGetOtherUsers(); // Custom hook to fetch users

  const { otherUsers } = useSelector(store => store.user); // Get users from Redux store

  if (!otherUsers || otherUsers.length === 0) {
    return <div>Loading users...</div>; // Show a loading message while data is being fetched
  }

  return (
    <div className='overflow-auto flex-1'>
      {otherUsers.map(user => (
        <OtherUser key={user._id} user={user} /> // Render each user
      ))}
    </div>
  );
}

export default OtherUserss;
