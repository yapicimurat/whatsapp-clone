import React from "react";
import UserDefaultImage from "../../assets/images/user-image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
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

    this.isRequestForChat = (this.props.isRequestForChat != undefined) ? this.props.isRequestForChat : false;
    this.acceptRequest = this.acceptRequest.bind(this);
    this.declineRequest = this.declineRequest.bind(this);
  }


  acceptRequest(){
    //accept request
  }

  declineRequest(){
    //decline request
    
  }

  clickChat()  
  {
    this.props.applySelectedChatInformations(this.chatID);
  }


  render(){
    const classNameLastMessage = (this.props.lastMessage == "" || this.props.lastMessage == undefined) ? "chat-detail-last-message no-dialog" : "chat-detail-last-message";
    const classNameChatListInformation = (this.props.chatID == this.props.getSelectedChatInformations().chatID) ? "chat-list-information chat-list-information-active" : "chat-list-information";
    const lastMessage = (this.props.lastMessage == "" || this.props.lastMessage == undefined) ? `You don't have any dialog with ${this.chatUsername} before.` : this.props.lastMessage;
    this.lastMessageDatetime = (this.lastMessageDatetime == "" || this.lastMessageDatetime == undefined) ? "" : this.lastMessageDatetime;
    const date =  (this.props.lastMessageDatetime == "" || this.props.lastMessageDatetime == undefined) ? null: new Date(this.props.lastMessageDatetime).toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit"
    });
    
    if(this.isRequestForChat == false){
      return(
        <div className={classNameChatListInformation}
          onClick={this.clickChat}>
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
    }else{
      return (
        <div className="user-chat-request-main">
          <div className="user-chat-request-left">
            <b style={{fontSize: "16px", color: "#ff0000"}}>{this.chatUsername}</b> sent you a messaging request. Do you want to accept?
          </div>
          <div className="user-chat-request-right">
              <button
              className="accept-button"
              onClick={this.acceptRequest}
              >Accept <br/><FontAwesomeIcon style={{fontSize: "18px"}} icon={icons.faCheckCircle}/></button>
              <button
              className="decline-button"
              onClick={this.declineRequest}
              >Decline <br/><FontAwesomeIcon style={{fontSize: "18px"}} icon={icons.faTimesCircle}/></button>
            </div>
        </div>
      );
    }
    
  }


}
export default ChatListInformation;
