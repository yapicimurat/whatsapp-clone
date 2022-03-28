import React from "react";
import UserInformation from "../User/UserInformation";
import ChatArea from "./ChatArea";
import ChatDetailBottom from "./ChatDetailBottom";
class ChatDetail extends React.Component {
  constructor(props) {
    super(props);
    
    this.userID = props.userID;
    this.username = props.username;
    this.chats = null;

    this.chatID = null;
    this.targetUserID = null;
    this.targetUsername = null;

  }


  render() {
    const {chatID, roomName, targetUserID, targetUsername} = this.props.getSelectedChatInformations();
    this.chatID = chatID;
    this.roomName = roomName;
    this.targetUsername = targetUsername;
    this.targetUserID = targetUserID;

    this.chats = this.props.chats;
    
    return (
      <div className="chat-detail-area">
        <UserInformation
          userID={this.targetUserID}
          username={this.targetUsername}
        />
        <div className="chat-detail">
          <ChatArea
            userID={this.userID}
            username={this.username}
            chats={this.chats}
            getSelectedChatInformations={this.props.getSelectedChatInformations}
            socket={this.props.socket}
          />
        </div>
        <ChatDetailBottom 
          userID={this.props.userID}
          username={this.props.username}
          socket={this.props.socket}
          getSelectedChatInformations={this.props.getSelectedChatInformations}
        />
      </div>
    );
    

  }


}
export default ChatDetail;
