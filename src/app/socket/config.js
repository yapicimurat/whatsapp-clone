const socketConfig = {
    URL: "http://localhost:3005",
    ACTIONS: {
        CLIENT_CONNECTED: "connect",
        CLIENT_ERROR: "connect_error",
        SERVER_CONNECT_ROOMS: "SERVER-CONNECT_ALL_OF-ROOMS",
        CLIENT_RECEIVED_MESSAGE: "CLIENT-ROOM_MESSAGE",
        CLIENT_NEW_CHAT: "CLIENT-NEW_CHAT",
        SERVER_MESSAGE_TO_ROOM: "SERVER-MESSAGE_TO_ROOM",
        SERVER_NEW_CHAT: "SERVER-NEW_CHAT"
    }
};


export default socketConfig;