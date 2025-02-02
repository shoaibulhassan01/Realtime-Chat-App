import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { setAuthUser } from '../redux/userSlice'

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });
      
      Navigate("/");
      console.log(res);
      dispatch(setAuthUser(res.data));
      
    } catch (error) {
      toast.error(error.response.data.message);
    }

    console.log(user);
    setUser({
      email: "",
      password: "",
    });
  }

  return (
    <div className='w-[450px] mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl font-bold pb-5 text-center text-gray-300'>Login to BuzzChat</h1>
        <form onSubmit={onSubmitHandler}>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text '>Email</span>
            </label>
            <input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className='w-full input input-bordered h-10 bg-white'
              type="email"
              placeholder='Enter Email'
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text '>Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full input input-bordered h-10 bg-white'
              type="password"
              placeholder='Password'
            />
          </div>

          <p className='text-center mt-5'>
            <Link to="/register" className='text-center'>
              Don't have an account? SignUp
            </Link>
          </p>

          <div>
            <button type='submit' className='btn btn-block btn-sm mt-2 pt-3 pb-7 border border-slate-700'>Login</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Login;
