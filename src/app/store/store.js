import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import userReducer from "../../features/user/user";
import chatReducer from "../../features/chat/chat";
export const store = configureStore({
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
        
    },
    reducer: {
        userReducer,
        chatReducer
    }
});