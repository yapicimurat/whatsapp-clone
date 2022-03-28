import React from "react";
import UserDefaultImage from "../../assets/images/user-image.png";
class ChatListInformation extends React.Component
{
  constructor(props)
  {
    super(props);
    
    this.isOwner = props.isOwner;
    this.chatID = props.chatID;
    this.ownerID = props.ownerID;
    this.targetID = props.targetID;
    this.userID = props.userID;
    this.username = props.username;
    this.chatUsername = props.chatUsername;

    this.lastMessage = props.lastMessage;
    this.lastMessageDatetime = props.lastMessageDatetime;

    this.clickChat = this.clickChat.bind(this);
  }

  clickChat()  
  {
    this.props.applySelectedChatInformations(this.chatID);
  }


  render(){
    const classNameLastMessage = (this.lastMessage == "" || this.lastMessage == undefined) ? "chat-detail-last-message no-dialog" : "chat-detail-last-message";
    const classNameChatListInformation = (this.props.chatID == this.props.getSelectedChatInformations().chatID) ? "chat-list-information chat-list-information-active" : "chat-list-information";
    const lastMessage = (this.props.lastMessage == "" || this.props.lastMessage == undefined) ? `You don't have any dialog with ${this.chatUsername} before.` : this.props.lastMessage;
    this.lastMessageDatetime = (this.lastMessageDatetime == "" || this.lastMessageDatetime == undefined) ? "" : this.lastMessageDatetime;
    const date =  (this.props.lastMessageDatetime == "" || this.props.lastMessageDatetime == undefined) ? null: new Date(this.props.lastMessageDatetime).toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit"
    });
    
    return(

      <div className={classNameChatListInformation}
        onClick={this.clickChat}
        >
        <div className="user-image">
          <img src={UserDefaultImage}/>
        </div>
        
        <div className="chat-detail-title">
          <div className="chat-detail-user">{this.chatUsername}</div>
          <div className={classNameLastMessage}>{lastMessage}</div>
        </div>
        <div className="chat-detail-time">{date}</div>
      </div>
    );
  }


}
export default ChatListInformation;
