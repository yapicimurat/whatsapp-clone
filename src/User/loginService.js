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
        return axios.get(API_TYPES.LOGIN(username, password))
            .then(res => {
                const { data } = res;
                if (!data.error) {
                    /*
                      response uzerinden alinmasi gereken bilgileri
                      userID                => data.value.login[0]._id
                      username              => data.value.login[0].username
                      chats                 => data.value.chats (array)
                          chatID            => data.value.chats[i]._id;
                          roomName          => data.value.chats[i].roomName;
                          ownerID           => data.value.chats[i].ownerUser[0]._id
                          ownerUsername     => data.value.chats[i].ownerUser[0].username
                          targetID          => data.value.chats[i].targetUser[0]._id
                          targetUsername    => data.value.chats[i].targetUser[0].username
                          messages          => data.value.chats[i].messages
                    */
                    return Promise.resolve({
                        userID: data.value.login[0]._id,
                        username: data.value.login[0].username,
                        chats: data.value.chats
                    });
                }
                else {
                    return Promise.reject(data.message.login);
                }
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }
}