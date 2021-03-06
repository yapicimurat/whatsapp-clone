import React, { useState } from "react";
import axios from "axios";
import { API_TYPES } from "../../app/api/api";
import socketConfig from "../../app/socket/config";


export default function ChatDetailBottom({ chat, userID, username, socket }) {

  //state
  const [message, setMessage] = useState("");

  const { roomName } = chat;

  const { _id: targetUserID } = chat.targetUser[0];

  const keyDown = (e) => {

    setMessage(e.target.value);

    //enter
    if (e.keyCode == 13) {
      if (socket !== null && socket && socket.connected === true) {
        if (message !== "" && message !== null && message !== undefined) {
          axios.get(API_TYPES.SEND_MESSAGE(chat._id, userID, targetUserID, message, roomName),{
            headers: {
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`
            }
          })
            .then(response => {
              const {error, message, result} = response.data;
              socket.emit(socketConfig.ACTIONS.SERVER_MESSAGE_TO_ROOM, {
                messageID: result._id,
                roomName: result.roomName,
                message: result.message,
                ownerID: result.ownerID,
                chatID: result.chatID,
                targetID: result.targetID,
                datetime: result.datetime
              });
            })
            .catch(error => {
              alert(error.message);
            });
        }
        setMessage("");
      }
      else {
        alert("Bir hata meydana geldi.");
      }
    }
  }

  return (
    <div className="chat-detail-bottom">
      <input
        type="text"
        placeholder="Bir şeyler yazın"
        onKeyDown={keyDown}
        value={message}
        onChange={keyDown} />
    </div>
  );
}