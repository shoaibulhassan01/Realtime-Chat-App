// Messages.jsx
import React from 'react';
import SingleMessages from './SingleMessages';
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

function Messages() {
  useGetMessages()
  useGetRealTimeMessage(); // Fetch messages when the component mounts
  const { messages } = useSelector((store) => store.message);

  console.log('Messages from Redux store:', messages); // Debugging line

  // if (!messages) {
  //   return <div>No Messages Found</div>; // Display when no messages are available
  // }

  return (
    <div className='px-4 flex-1 overflow-auto'>
    {
    messages && messages.map((message) => (
      <SingleMessages key={message._id} message={message} />
    ))
    }
  </div>
  );
}

export default Messages;
