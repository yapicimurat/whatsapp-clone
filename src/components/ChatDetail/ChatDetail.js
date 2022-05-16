import React,{useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {addSelectedChatMessage} from "../../features/chat/chat";
import UserInformation from "../User/UserInformation";
import ChatArea from "./ChatArea";
import ChatDetailBottom from "./ChatDetailBottom";
import socketConfig from "../../app/socket/config";

export default function ChatDetail(){

  const selectedChat = useSelector(state => state.chatReducer.selectedChat);

  const {ownerID, targetID, targetUser, ownerUser, messages} = selectedChat;

  const {id: userID, username, socket} = useSelector(state => state.userReducer);
  
  const accordingToThisClientTargetUser = (userID === ownerID) ? targetUser[0] : ownerUser[0];

  const dispatch = useDispatch();
  

  useEffect(() => {
    socket.on(socketConfig.ACTIONS.CLIENT_RECEIVED_MESSAGE, data => {
      dispatch(addSelectedChatMessage({
        _id: data.messageID,
        chatID: data.chatID,
        datatime: data.datetime,
        message: data.message,
        targetID: data.targetID,
        ownerID: data.ownerID,
        roomName: data.roomName,
      }));
    });
  }, []);
  
  
  return (
    <div className="chat-detail-area">
      <UserInformation
        userID={targetID}
        username={accordingToThisClientTargetUser.username}/>
      <div className="chat-detail">
        <ChatArea
          userID={userID}
          username={username}
          messages={messages}/>
      </div>
      <ChatDetailBottom  
        chat={selectedChat}
        userID={userID}
        username={username}
        socket={socket}
        />
    </div>
  );
}