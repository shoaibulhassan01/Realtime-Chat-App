import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "message",
    initialState: {
        messages: [], // Ensure it's an array
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload; // Update state correctly
        },
    },
});

export const { setMessages } = messageSlice.actions; // Use `actions`, not `action`
export default messageSlice.reducer;
