import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {setSelectedChat} from "../../features/chat/chat";

import UserDefaultImage from "../../assets/images/user-image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";


import clsx from "clsx";


export default function ChatListInformation({ chat }) {


  /*
  YARDIMCILAR....
    -- GONDERİLEN PROPS'LAR
    --------------------------------------
    ownerID={chat.ownerID}
    targetID={chat.targetID}
    chatUsername={chatUsername}
    lastMessage={(chat.messages.length > 0) ? chat.messages[chat.messages.length - 1].message : null}
    lastMessageDatetime={(chat.messages.length > 0) ? chat.messages[chat.messages.length - 1].datetime : null}
  */

  const dispatch = useDispatch();
  const { id: userId, username } = useSelector(state => state.userReducer);

  //prop'dan gelen chatId ile reducerdaki chat'i bul...
  const COUNT_OF_MESSAGES = chat.messages.length;
  

  

  const classNameChatListInformation = clsx({
    "chat-list-information": true,
    //chat-list-information-active => chat secilme yapildiginda ayarlanacak...!!!!
    "chat-list-information-active": false
  });


  const ownerId = chat.ownerUser[0]._id;
  const ownerUsername = chat.ownerUser[0].username;

  const isOwner = (userId === ownerId) ? true : false;

  const targetId = chat.targetUser[0]._id;
  const targetUsername = chat.targetUser[0].username;

  const chatUsername = (isOwner) ? targetUsername : ownerUsername;

  const lastMessage = (COUNT_OF_MESSAGES > 0) ? chat.messages[COUNT_OF_MESSAGES - 1].message : `You don't have any dialog with ${chatUsername}`;
  const dateTime = (COUNT_OF_MESSAGES === 0) ? null : new Date(chat.messages[COUNT_OF_MESSAGES - 1].datetime).toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit"
  });
  
  const classNameLastMessage = clsx({
    "chat-detail-last-message": true,
    "no-dialog": (COUNT_OF_MESSAGES === 0)
  });
  const clickChat = () => {
    dispatch(setSelectedChat(chat));
  }


  return (
    <div className={classNameChatListInformation} onClick={clickChat}>
      <div className="user-image">
        <img src={UserDefaultImage} />
      </div>
      <div className="chat-detail-title">
        <div className="chat-detail-user">{chatUsername}</div>
        <div className={classNameLastMessage}>{lastMessage}</div>
      </div>
      <div className="chat-detail-time">{dateTime}</div>
    </div>
  );

}