const BASE_URL = "http://localhost:3005/";


const API_TYPES = {
    REGISTER: () => {
        return BASE_URL + `register`;
    },
    LOGIN: () => {
        return BASE_URL + `login`;
    },
    SEND_MESSAGE: (chatId, ownerId, targetId, message, roomName) => {
        return `${BASE_URL}send-message?chatID=${chatId}&ownerID=${ownerId}&targetID=${targetId}&message=${message}&roomName=${roomName}`;
    },
    CREATE_NEW_CHAT: (ownerId, targetUsername) => {
        return `${BASE_URL}create-chat?ownerID=${ownerId}&targetUsername=${targetUsername}`;
    },
    GET_USER: () => {
        return BASE_URL + `getUser`;
    }
};

export { API_TYPES };