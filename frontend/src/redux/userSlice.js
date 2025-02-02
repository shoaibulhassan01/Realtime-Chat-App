import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        authUser: null,
        otherUsers: [], // Initialize as an empty array
        selectedUser: null,
        onlineUsers:null

    },
    
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        },
        setOtherUsers: (state, action) => {
            state.otherUsers = action.payload; // Correct spelling here
        },
        setselectedUser:(state,action)=>{
            state.selectedUser = action.payload
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers = action.payload
        }
    }
    
    
});

export const { setAuthUser, setOtherUsers, setselectedUser, setOnlineUsers } = userSlice.actions; // If you have actions to export
export default userSlice.reducer; // Export the reducer
