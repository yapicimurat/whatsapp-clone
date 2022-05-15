const BASE_URL = "http://localhost:3005/";


const API_TYPES = {
    //http://localhost:3005/register?username=${username}&password=${password}
    REGISTER: (username, password) => {
        return BASE_URL + `register?username=${username}&password=${password}`;
    },
    //http://localhost:3005/login?username=${this.username}&password=${this.password}
    LOGIN: (username, password) => {
        return BASE_URL + `login?username=${username}&password=${password}`;
    },
    //http://localhost:3005/send-message?chatID=${chat._id}&ownerID=${userID}&targetID=${targetUserID}&message=${message}&roomName=${roomName}
    SEND_MESSAGE: (chatId, ownerId, targetId, message, roomName) => {
        return `${BASE_URL}send-message?chatID=${chatId}&ownerID=${ownerId}&targetID=${targetId}&message=${message}&roomName=${roomName}`;
    },
    //http://localhost:3005/create-chat?ownerID=${userID}&targetUsername=${filter}
    CREATE_NEW_CHAT: (ownerID, targetUsername) => {
        return `${BASE_URL}create-chat?ownerID=${ownerID}&targetUsername=${targetUsername}`;
    }
};

export {API_TYPES};