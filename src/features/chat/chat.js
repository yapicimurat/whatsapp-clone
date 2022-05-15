import { createSlice } from "@reduxjs/toolkit";

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
        addChat: (state, action) => {
            
            state.chats.push(action.payload);
        },
        addMessage: (state, action) => {
            //action-> id, message
            const chat = state.chats.filter(chat => (chat._id === action.payload.chatID))[0];
            console.log(chat.messages.length);
            chat.messages.push(action.payload);

            
            if(state.selectedChat !== null && action.payload.chatID === chat._id){
                
                state.selectedChat.messages.push(action.payload);
            }


        },
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload;
        }
    }
});

export const { setChats, setSelectedChat, addMessage, addChat } = chatSlice.actions;
export default chatSlice.reducer;