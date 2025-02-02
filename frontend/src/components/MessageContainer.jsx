import React, { useEffect } from 'react';
import SendInput from './SendInput';
import Messages from './Messages';
import { useDispatch, useSelector } from 'react-redux';
import { setselectedUser } from '../redux/userSlice';

function MessageContainer() {
    const { selectedUser, onlineUsers } = useSelector(store => store.user);
    
    // Use selectedUser to check if they're online
    const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(selectedUser?._id); 
    
    // Debugging: Check selectedUser state
    console.log('Selected User:', selectedUser);
    
    const dispatch = useDispatch();
    
    // Clean up selectedUser on component unmount
    // useEffect(() => {
    //   return () => dispatch(setselectedUser(null))
    // }, [dispatch]) 

    return (
        <>
            {selectedUser !== null && selectedUser !== undefined ? (  // Strict check
                <div className='sm:min-w-[600px] flex flex-col'>
                    <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
                        <div className={`avatar ${isOnline ? 'online' : 'offline'}`}>
                            <div className='w-12 rounded-full'>
                                <img src={selectedUser?.profilePhoto} alt='User-Profile' />
                            </div>
                        </div>

                        <div className='flex flex-col flex-1'>
                            <div className='flex justify-between gap-2 flex-1'>
                                <p className='text-lg'>{selectedUser?.fullName}</p>
                            </div>
                        </div>
                    </div>

                    <Messages />
                    <SendInput />
                </div>
            ) : (
                <h1>Let's Start Conversation</h1>  // This will show when selectedUser is null/undefined
            )}
        </>
    );
}

export default MessageContainer;
