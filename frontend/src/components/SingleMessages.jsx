import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

function SingleMessages({ message }) {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector(store => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // Function to format the time from the createdAt string
  const formatTime = (createdAt) => {
    const date = new Date(createdAt);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <div>
      <div ref={scroll} className={`chat ${authUser?._id === message?.senderId ? 'chat-end' : 'chat-start'}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="User avatar"
              src={message?.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto} />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs text-white opacity-50">
            {formatTime(message?.createdAt)} {/* Display the formatted time */}
          </time>
        </div>
        <div className={`chat-bubble ${authUser?._id === message?.senderId ? 'chat-end bg-gray-300 text-black' : 'chat-start'}`}>
          {message?.message}
        </div>
      </div>
    </div>
  );
}

export default SingleMessages;
