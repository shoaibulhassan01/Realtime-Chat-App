import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setselectedUser } from '../redux/userSlice';

function OtherUser({ user }) {
    const dispatch = useDispatch();
    const { selectedUser, onlineUsers } = useSelector(store => store.user);
    
    // Safely check if onlineUsers exists and is an array before using .includes()
    const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(user?._id);

    const selectedUserHandler = () => {
        dispatch(setselectedUser(user));
    };

    return (
        <>
            <div onClick={selectedUserHandler} className={`${selectedUser?._id === user?._id ? 'bg-zinc-700' : ""} flex gap-2 items-center hover:bg-zinc-700 rounded-md p-2 cursor-pointer`}>
                <div className={`avatar ${isOnline ? 'online' : 'offline'}`}>
                    <div className='w-12 rounded-full'>
                        <img src={user?.profilePhoto} alt="User-Profile" />
                    </div>
                </div>
                
                <div className='flex flex-col flex-1'>
                    <div className='flex justify-between gap-2 flex-1'>
                        <p className='text-lg'>{user?.fullName}</p>
                    </div>
                </div>
            </div>
            <div className='divider my-0 py-1 h-1'></div>
        </>
    );
}

export default OtherUser;
