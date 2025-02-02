import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'


function Signup() {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: ""
  });
  const [msg, setMsg] = useState("")
  const Navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender })
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(user)
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      })
      
      setMsg(res.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: ""
    })
  }
  return (
    <div className='w-[450px] mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl font-bold pb-5 text-center text-gray-300'>SignUp to BuzzChat</h1>
        <form action="" onSubmit={onSubmitHandler}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text '>Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className='w-full input input-bordered h-10 bg-white'
              type="text"
              placeholder='Enter Full Name'
            />
          </div>

          <div>

            <label className='label p-2'>
              <span className='text-base label-text '>Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className='w-full input input-bordered h-10 bg-white'
              type="text"
              placeholder='Enter Username'
            />
          </div>
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
              type="text"
              placeholder='Password'
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text '>Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              className='w-full input input-bordered h-10 bg-white'
              type="text"
              placeholder='Confirm Password'
            />
          </div>

          <div className='flex items-center my-2 pt-2'>
            <div className='flex items-center'>
              <p>Male:</p><input checked={user.gender === 'male'} onChange={() => handleCheckbox('male')} type="checkbox" defaultChecked className="checkbox  mx-2" />
            </div>

            <div className='flex items-center'>
              <p>Female:</p><input checked={user.gender === 'Female'} onChange={() => handleCheckbox('Female')} type="checkbox" defaultChecked className="checkbox  mx-2" />
            </div>
          </div>

          <p className='text-center mt-5'>
            <Link to="/login" className='text-center'>
              Already have an account?Login
            </Link>
          </p>

          <div>
            <button type="submit" className='btn btn-block btn-sm mt-2 pt-3 pb-7 border  border-slate-700'>Signup</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Signup