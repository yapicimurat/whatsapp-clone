import {createSlice, getDefaultMiddleware} from "@reduxjs/toolkit";

const initialState = {
    isLogged: false,
    isSocketConnected: false,
    id: null,
    username: null,
    socket: null
};


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.socket = action.payload.socket;
            state.isSocketConnected = action.payload.socket.connected;
            state.isLogged = action.payload.isLogged;
            state.id = action.payload.id;
            state.username = action.payload.username;
            
        }
    }
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;