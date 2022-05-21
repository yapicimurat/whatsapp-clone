import axios from "axios";
import { API_TYPES } from "../app/api/api";
export default class LoginService {

    constructor() {
        if (LoginService.instance instanceof LoginService) {
            return LoginService.instance;
        }
        Object.freeze(this);
        LoginService.instance = this;
        return LoginService.instance;
    }

    login(username, password) {
        return axios.post(API_TYPES.LOGIN(username, password), {
            username: username,
            password: password
        })
            .then(res => {
                const { result, message, error } = res.data;
                if (!error) {
                    if(result.login !== null){
                        return Promise.resolve({
                            userID: result.login._id,
                            username: result.login.username,
                            chats: result.chats
                        });
                    }else{
                        return Promise.reject(message.login);
                    }
                }
                else {
                    return Promise.reject(message.login);
                }
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }
}