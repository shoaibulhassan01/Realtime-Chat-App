import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket); // Get socket from Redux
  const { messages } = useSelector((store) => store.message); // Get messages from Redux
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      // Listen for 'newMessage' event from the server
      socket.on('newMessage', (newMessage) => {
        // Append new message to the existing messages
        dispatch(setMessages([...(messages || []), newMessage])); 
      });
    }

    // Clean up socket event listener when the component unmounts
    return () => {
      socket?.off('newMessage');
    };
  }, [socket, messages, dispatch]);
};

export default useGetRealTimeMessage;
