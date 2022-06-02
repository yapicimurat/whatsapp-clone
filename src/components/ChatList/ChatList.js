//REACT
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import socketConfig from "../../app/socket/config";
import { addChat, addChatMessage } from "../../features/chat/chat";
//END REACT...
import { addMessage } from "../../features/chat/chat";

//COMPONENTS
import UserInformation from "../User/UserInformation";
import ChatListFilter from "./ChatListFilter";
import ChatListInformation from "./ChatListInformation";
//END COMPONENTS....


function getChatList(userId, chatFilter, chats) {
  if (Array.isArray(chats) && chats.length > 0) {
    if (chatFilter === "") {
      return chats.map((chat) => {
        return <ChatListInformation
          key={chat._id}
          chat={chat} />
      })
    } else {
      return chats.filter(chat => {
        return (chat.ownerUser[0]._id !== userId) ? chat.ownerUser[0].username.includes(chatFilter) : chat.targetUser[0].username.includes(chatFilter)
      })
        .map(chat => {
          return <ChatListInformation
            key={chat._id}
            chat={chat} />
        });
    }
  } else {
    return <div className="no-chat">You don't have any chat...</div>;
  }

}

export default function ChatList() {

  const chats = useSelector(state => state.chatReducer.chats);

  const { id: userID, username, socket } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const chatFilter = useSelector(state => state.chatReducer.filter);
  useEffect(() => {
    socket.on(socketConfig.ACTIONS.CLIENT_NEW_CHAT, data => {
      //asagidaki kod socket'e bu client icin yeni odaya baglanmasini ve chat listesini yenilemesini sagliyor
      socket.emit(socketConfig.ACTIONS.SERVER_CONNECT_ROOMS, {
        roomNames: [data.chat[0].roomName]
      });

      dispatch(addChat(data.chat[0]));

    });

    socket.on(socketConfig.ACTIONS.CLIENT_RECEIVED_MESSAGE, data => {
      dispatch(addChatMessage({
        _id: data.messageID,
        chatID: data.chatID,
        datetime: data.datetime,
        message: data.message,
        targetID: data.targetID,
        ownerID: data.ownerID,
        roomName: data.roomName,
      }));
    });
  }, []);



  // const chatList = (Array.isArray(chats) && chats.length > 0) ?
  //   chats.map((chat) => {
  //     return <ChatListInformation
  //       key={chat._id}
  //       chat={chat} />
  //   }) : (
  //     <div className="no-chat">You don't have any chat...</div>
  //   )

  return (
    <div className="chat-list-area">
      <UserInformation
        id={userID}
        username={username}
      />
      <ChatListFilter />
      <div className="chat-list">
        {
          getChatList(userID, chatFilter, chats)
        }
      </div>
    </div>
  );




}