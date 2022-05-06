const BASE_URL = "http://localhost:3005/";


const API_TYPES = {
    //http://localhost:3005/register?username=${username}&password=${password}
    REGISTER: (username, password) => {
        return BASE_URL + `register?username=${username}&password=${password}`;
    },
    //http://localhost:3005/login?username=${this.username}&password=${this.password}
    LOGIN: (username, password) => {
        return BASE_URL + `login?username=${username}&password=${password}`;
    }
};

export {API_TYPES};