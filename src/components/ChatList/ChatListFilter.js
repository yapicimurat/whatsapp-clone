import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addChat, filterChat } from "../../features/chat/chat";
import axios from "axios";
import { API_TYPES } from "../../app/api/api";
import socketConfig from "../../app/socket/config";
export default function ChatListFilter() {


  const [filter, setFilter] = useState("");
  const { id: userID, username, socket } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();


  const changeEvent = (e) => {
    setFilter(e.target.value);

    dispatch(filterChat(e.target.value));

  }

  const submitForm = (e) => {
    e.preventDefault();
  }


  const createNewChat = () => {


    if (filter !== "") {
      //create-chat targeID yerine targetUsernam istemeli!!!
      //gelen istek sonucunda roomName'a join ol!!!
      if (filter === username) {
        alert("You can not chat with yourself.");
        setFilter("");
      } else {
        if (window.confirm("Are you sure you want to chat with this user?")) {
          axios.get(API_TYPES.CREATE_NEW_CHAT(userID, filter))
            .then(response => {
              const { error, message, result } = response.data;
              if (!error) {
                if (result !== null) {
                  const chat = result;
                  socket.emit(socketConfig.ACTIONS.SERVER_NEW_CHAT, { chat: chat });

                  socket.emit(socketConfig.ACTIONS.SERVER_CONNECT_ROOMS, {
                    roomNames: [chat.roomName]
                  });
                  dispatch(addChat(chat));
                } else {
                  alert(message);
                }


              }
              else {
                alert(message);
              }
            })
            .catch(error => {
              alert(error.message);
            });
        }
      }

    } else {
      alert("Please enter username of your friend.");
    }
  }

  return (
    <form
      className="chat-list-filter"
      onSubmit={submitForm}
    >
      <FontAwesomeIcon className="chat-filter-search-icon" icon={icons.faSearch} />
      <input
        type="text"
        placeholder="Search a chat or create a new chat..."
        value={filter}
        onChange={changeEvent}
      />
      <button
        className="add-user"
        title="Send request to add new friend"
        onClick={createNewChat}
      ><FontAwesomeIcon icon={icons.faUserPlus} /></button>
    </form>
  );
}
