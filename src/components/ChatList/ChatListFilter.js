import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import React from "react";

import axios from "axios";
class ChatListFilter extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      filter: ""
    }

    this.changeEvent = this.changeEvent.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.createNewChat = this.createNewChat.bind(this);

  }

  changeEvent(event) {
    this.setState({
      filter: event.target.value
    });
    this.props.setFilterText(event.target.value);
  }


  submitForm(e){
    e.preventDefault();
  }



  createNewChat(){
    const filterText = this.state.filter;
    if(filterText != ""){
      //create-chat targeID yerine targetUsernam istemeli!!!
      //gelen istek sonucunda roomName'a join ol!!!
      if(filterText == this.props.username){
        alert("You can not chat with yourself.");
        this.setState({
          filter: ""
        });
        this.props.setFilterText("");
      }else{
        if(window.confirm("Are you sure you want to chat with this user?")){
          axios.get(`http://localhost:3005/create-chat?ownerID=${this.props.userID}&targetUsername=${this.state.filter}`)
          .then(response => {
            const {error, message, value} = response.data;
            if(error == false )
            {
              //server'a bilgi gonder ve karsi tarafa'da bilgiler gitsin
              const chat = value.chats.filter((chat) => {
                return (chat.targetUser[0].username == this.state.filter)
              });
              this.props.socket.emit("SERVER-CONNECT_ALL_OF-ROOMS", {
                roomNames: [chat[0].roomName]
              });
              this.props.socket.emit("SERVER-NEW_CHAT",{chat: chat});
              this.props.applyChats(value.chats);
            }
            else{
              alert(message);
            }
          })
          .catch(error => {
            alert(error.message);
          });
        }
      }
      
    }else{
      alert("Please enter username of your friend.");
    }
  }

  render() {
    return (
      <form
        className="chat-list-filter"
        onSubmit={this.submitForm}
        >
        <FontAwesomeIcon className="chat-filter-search-icon" icon={icons.faSearch} />
        <input
          type="text"
          placeholder="Search a chat or create a new chat..."
          value={this.state.filter}
          onChange={this.changeEvent}
        />
        <button
          className="add-user"
          title="Send request to add new friend"
          onClick={this.createNewChat}
        ><FontAwesomeIcon icon={icons.faUserPlus} /></button>
      </form>
    );
  }


}
export default ChatListFilter;
