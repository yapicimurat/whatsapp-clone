import axios from "axios";
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
        return axios.get(`http://localhost:3005/register?username=${username}&password=${password}`)
        .then(res => {
            const {data} = res;
            if(!data.error){
              return Promise.resolve(data.message);
            }
            else
            {
              return Promise.reject(data.message);
            }
        })
        .catch(error => {
            return Promise.reject(error);
        });
    }


}