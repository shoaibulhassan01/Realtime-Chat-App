import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';

function useGetOtherUsers() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true; // Handle cookies if required
        const res = await axios.get(`http://localhost:8080/api/v1/user`);
        // console.log("API Response:", res);
        // Dispatch the action to store users in Redux
        dispatch(setOtherUsers(res.data));
       
      } catch (error) {
        console.log(error); // Log error in case of failure
      }
    };
    fetchOtherUsers();
  }, [dispatch]); // Add 'dispatch' as a dependency
}

export default useGetOtherUsers;
