import React from "react";
import "./assets/css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import loadingIcon from "./assets/images/loading.gif";
import { io } from "socket.io-client";
import ChatList from "./components/ChatList/ChatList";
import ChatDetail from "./components/ChatDetail/ChatDetail";
import Welcome from "./components/User/welcome";
class App extends React.Component {
  constructor(props) {
    super(props);


    this.page = props.page;

    //LOGGED IN USER INFORMATIONS
    this.isLogged = false;
    this.userID = null;
    this.username = null;
    this.chats = null;
    this.socket = null;

    //SELECTED CHAT INFORMATIONS
    this.selectedChatID = null;
    this.selectedChatIndex = null;
    this.selectedChatRoomName = null;
    this.selectedChatUserID = null;
    this.selectedChatUsername = null;
    this.selectedChatOwnerID = null;
    this.selectedChatTargetID = null;


    //STATE INFORMATIONS
    this.state = {
      page: this.page,
      isLogged: this.isLogged,
    };

    this.goToPage = this.goToPage.bind(this);
    this.applyUserInformations = this.applyUserInformations.bind(this);
    this.applySelectedChatInformations = this.applySelectedChatInformations.bind(this);
    this.getSelectedChatInformations = this.getSelectedChatInformations.bind(this);
    this.applyChats = this.applyChats.bind(this);
    this.connectSocket = this.connectSocket.bind(this);
  }

  applyUserInformations(data) {
    const { userID, username, chats } = data;
    this.isLogged = true;
    this.userID = userID;
    this.username = username;
    this.chats = chats;
    this.setState({
      isLogged: true,
      connectedSocket: false
    });
  }
  applyChats(chats){
    this.chats = chats;
    this.setState({});
  }

  connectSocket() {
    this.socket = io("http://localhost:3005");

    this.socket.on("connect", () => {
      this.setState({
        connectedSocket: true
      });
      this.roomNames = [];
      this.chats.forEach(chat => {
        this.roomNames.push(chat.roomName);
      });
      this.socket.emit("SERVER-CONNECT_ALL_OF-ROOMS", {
        roomNames: this.roomNames
      });

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
      this.socket.on("CLIENT-NEW_CHAT",data => {
        this.socket.emit("SERVER-CONNECT_ALL_OF-ROOMS", {
          roomNames: [data.chat[0].roomName]
        });
        if(this.chats.length == 0){
         this.chats = data.chat;
        }else{
          this.chats.push(data.chat[0]);
        }
        this.setState({});
      });


    });
  }

  applySelectedChatInformations(chatID) {
    this.chats.forEach((chat, index) => {
      if (chat._id == chatID) {
        this.selectedChatID = chatID;
        this.selectedChatIndex = index;
        this.selectedChatRoomName = chat.roomName;
        this.selectedChatOwnerID = chat.ownerUser[0]._id;
        this.selectedChatTargetID = chat.targetUser[0]._id;
        const isOwner = (chat.ownerUser[0]._id == this.userID) ? true : false;
        if (isOwner) {
          this.selectedChatUserID = chat.targetUser[0]._id;
          this.selectedChatUsername = chat.targetUser[0].username;

        }
        else {
          this.selectedChatUserID = chat.ownerUser[0]._id;
          this.selectedChatUsername = chat.ownerUser[0].username;
        }
        this.setState({});
      }
    });
  }

  getSelectedChatInformations() {
    return {
      chatID: this.selectedChatID,
      chatIndex: this.selectedChatIndex,
      ownerID: this.selectedChatOwnerID,
      targetID: this.selectedChatTargetID,
      roomName: this.selectedChatRoomName,
      targetUserID: this.selectedChatUserID,
      targetUsername: this.selectedChatUsername
    }
  }


  checkIsUserLogged() {
    let isLogged = false;
    if (this.isLogged) {
      isLogged = true;
    }
  }

  goToPage(pageName) {
    this.setState({
      page: pageName
    });
  }


  render() {
    
    let page = this.state.page;
    if (this.isLogged) {
      page = "chat";
    }

    switch (page) {
      case "welcome":
        return (
          <Welcome
            applyUserInformations={this.applyUserInformations}
            connectSocket={this.connectSocket}
            appGoToPage={this.goToPage}
            operation="login" />
        );
        break;

      case "chat":
        if (this.state.connectedSocket == true) {
          return (
            <div className="app">
              <ChatList
                userID={this.userID}
                username={this.username}
                chats={this.chats}
                isUserLogged={this.checkIsUserLogged}
                applySelectedChatInformations={this.applySelectedChatInformations}
                getSelectedChatInformations={this.getSelectedChatInformations}
                getChats={this.getChats}
                applyChats={this.applyChats}
                socket={this.socket}
              />
              {
                (this.selectedChatID != null) ? <ChatDetail
                  userID={this.userID}
                  username={this.username}
                  chats={this.chats}
                  getSelectedChatInformations={this.getSelectedChatInformations}
                  socket={this.socket}
                /> : null
              }


            </div>
          );
        }
        else {
          return (
            <div>
              Connecting the socket server...
            </div>
          );
        }

        break;

      case "app-loading":
        return (
          <div className="app-loading">
            <img src={loadingIcon} />
            <p>Loading...</p>
          </div>

        );
        break;

      default:
        //page error -> not found fırlat
        return (
          <div className="not-found">
            <h2>404 Not Found</h2>

            <a href="#" onClick={() => this.goToPage("welcome")}><FontAwesomeIcon icon={icons.faArrowLeft} /> Go to welcome page</a>
          </div>
        );
        break;

    }


  }


}
export default App;
