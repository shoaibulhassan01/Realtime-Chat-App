import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector to access the Redux store
import Sidebar from './Sidebar';
import MessageContainer from './MessageContainer';

function HomePage() {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.user.authUser); // Access authUser from the Redux store

  useEffect(() => {
    if (!authUser) { // Check if the user is not authenticated
      navigate('/login'); // Redirect to the login page
    }
  }, [authUser, navigate]);

  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-blur-lg bg-opacity-0 '>
      <Sidebar />
      <MessageContainer />
    </div>
  );
}

export default HomePage;
