import React, { useState } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";

//COMPONENTS
import ChatList from "../ChatList/ChatList";
import ChatDetail from "../ChatDetail/ChatDetail";
//END COMPONENTS...

export default function Main() {
  const selectedChat = useSelector(state => state.chatReducer.selectedChat);

  return (
    <div className="app">
      <ChatList />
      {
        (selectedChat !== null) ? <ChatDetail /> : null
      }
    </div>
  );

}