import React, { useState } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";

//COMPONENTS
import ChatList from "../ChatList/ChatList";
import ChatDetail from "../ChatDetail/ChatDetail";
//END COMPONENTS...

export default function Main() {
  const selectedChat = useSelector(state => state.chatReducer.selectedChat);


  // isLogged: false,
  //   isSocketConnected: false,
  //   id: null,
  //   username: null,
  //   socket: null

  return (
    <div className="app">
      <ChatList />
      {
        //CHAT DETAIL KISMI HERHANGİ BİR CHAT SEÇİLDİĞİNDE GELECEK!!!
        (selectedChat !== null) ? <ChatDetail /> : null
      }
    </div>
  );

}