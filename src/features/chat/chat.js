import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chats: null,
    selectedChat: null,
    filter: ""
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        addChat: (state, action) => {
            
            state.chats.push(action.payload);
        },
        addSelectedChatMessage: (state, action) => {
            if(state.selectedChat !== null && action.payload.chatID === state.selectedChat._id){
                state.selectedChat.messages.push(action.payload);
            }
        },
        addChatMessage: (state, action) => {
            const chat = state.chats.filter(chat => (chat._id === action.payload.chatID))[0];
            chat.messages.push(action.payload);

        },
        filterChat: (state, action) => {
            state.filter = action.payload;
        }
    }
});

export const { setChats, setSelectedChat, addChatMessage, addSelectedChatMessage, addChat, filterChat } = chatSlice.actions;
export default chatSlice.reducer;