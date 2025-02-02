import React, { useState } from 'react'
import { MdSearch } from "react-icons/md";
import OtherUsers from './OtherUserss';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice';
function Sidebar() {
    const [search, setSearch] = useState("");
    const {otherUsers} = useSelector(store=>store.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () =>{
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/user/logout`)
            toast.success(res.data.message);
            navigate('/login')
            dispatch(setAuthUser(null))
        } catch (error) {
            console.log(error)
        }
       
    }
    const searchSubmitHandler = (e) =>{
        e.preventDefault();
        const conversationUser = otherUsers?.find((user) => user.fullName.toLowerCase().includes(search.toLowerCase()))
        if(conversationUser){
            dispatch(setOtherUsers([conversationUser]))
        }else{
            toast.error("User not found!")
        }
    }
    return (
        <div className='border-r border-slate-500 p-4  flex flex-col'>
            <form onSubmit={searchSubmitHandler} action="" className='flex items-center gap-1'>
                <input 
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                className="input input-bordered rounded-md"
                type="text"
                placeholder='Search...' />
                <button type='submit' className='btn btn-md bg-zinc-500'><MdSearch className='h-6 w-5 outline-none' /></button>
            </form>
            <div className="divider px-2"></div>
         <OtherUsers/>
         <div className='mt-2'>
            <button onClick={logoutHandler} className='btn btn-sm bg-zinc-700'>Logout</button>
         </div>
        </div>
    )
}

export default Sidebar