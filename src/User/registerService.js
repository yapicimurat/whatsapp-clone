import axios from "axios";
import { API_TYPES } from "../app/api/api";
export default class RegisterService{


    constructor(){
        if(RegisterService.instance instanceof RegisterService){
            return RegisterService.instance;
        }

        RegisterService.instance = this;
        Object.freeze(this);
        return RegisterService.instance;
    }


    register(username, password){
        return axios.post(API_TYPES.REGISTER(),{
            username: username,
            password: password
        })
        .then(res => {
            const {error, message, result} = res.data;
            if(!error){
                if(result !== null){
                    return Promise.resolve(message);
                }else{
                    return Promise.reject(message);
                }
            }else{
                return Promise.reject(message);
            }
        })
        .catch(error => {
            return Promise.reject(error);
        });
    }

}