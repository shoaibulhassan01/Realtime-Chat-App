import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/messageSlice';

function useGetMessages() {
    const {selectedUser} = useSelector(store=>store.user)
    const dispatch = useDispatch();

    useEffect(() => {
      const fetchMessages = async () => {
          // Check if selectedUser exists
          if (!selectedUser?._id) {
              console.log("No user selected", selectedUser); // Log the user state for debugging
              return;
          }
  
          try {
              axios.defaults.withCredentials = true;
              const res = await axios.get(`http://localhost:8080/api/v1/message/${selectedUser._id}`);
              console.log(res.data);  // Log the response data for debugging
              dispatch(setMessages(res.data));
          } catch (error) {
              console.error(error);
          }
      };
  
      fetchMessages();
  }, [selectedUser]);  // Add selectedUser as a dependency
  
      

}

export default useGetMessages