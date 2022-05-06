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

//roomNames array(string)
const connectRooms = (roomNames) => {

  socket.emit(socketConfigures.ACTIONS.SERVER_CONNECT_ROOMS, {
    roomNames: roomNames
  });
};

export { connect as connectSocket };



/*
this.socket = io("http://localhost:3005");

      this.socket.on("CLIENT-ROOM_MESSAGE", (data) => {
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
      this.socket.on("CLIENT-NEW_CHAT", data => {
        console.log(data);
        //asagidaki kod socket'e bu client icin yeni odaya baglanmasini ve chat listesini yenilemesini sagliyor
        // this.socket.emit("SERVER-CONNECT_ALL_OF-ROOMS", {
        //   roomNames: [data.chat[0].roomName]
        // });

        if (this.chats != null) {
          data.chat[0].isRequestForChat = true;
          this.chats.push(data.chat[0]);
          this.setState({});
        }

      });


    });

*/
