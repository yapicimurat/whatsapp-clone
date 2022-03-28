import axios from "axios";
export default class LoginService{


    constructor(username, password){
        if(LoginService.instance instanceof LoginService){
            return LoginService.instance;
        }
        this.username = username;
        this.password = password;

        Object.freeze(this);
        LoginService.instance = this;
        return LoginService.instance;
    }


    login(){
        return axios.get(`http://localhost:3005/login?username=${this.username}&password=${this.password}`)
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
              let transferData = {
                userID: data.value.login[0]._id,
                username: data.value.login[0].username,
                chats: data.value.chats
              };
              return Promise.resolve(transferData);
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