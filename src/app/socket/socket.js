import { io } from "socket.io-client";
import socketConfigures from "./config";

let socket = undefined; 


const connect = () => {
  //socket'a baglan ve socket objesini resolve et
  const _socket = io(socketConfigures.URL);

  return new Promise((resolve, reject) => {
    _socket.on(socketConfigures.ACTIONS.CLIENT_CONNECTED, () => {
      socket = _socket;
      resolve(_socket);
    });

    _socket.on(socketConfigures.ACTIONS.CLIENT_ERROR, (error) => {
      reject(error);
    });
    


  });
};



export { connect as connectSocket };



/*
this.socket = io("http://localhost:3005");

      this.socket.on("CLIENT-ROOM_MEfSSAGE", (data) => {
        const chat = this.chats.filter(chat => { return chat._id == data.chatID })[0];
        chat.messages.push({
          _id: data.messageID,
          chatID: data.chatID,
          roomName: data.roomName,
          ownerID: data.ownerID,
          datetime: data.datetime,
          targetID: data.targetID,
          message: data.message
        });
        this.setState({
          page: "chat"
        });
      });
     


    });

*/
