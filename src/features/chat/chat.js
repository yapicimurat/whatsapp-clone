import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    chats: null,
    selectedChat: null
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload;
        }
    }
});

export const {setChats, setSelectedChat} = chatSlice.actions;
export default chatSlice.reducer;