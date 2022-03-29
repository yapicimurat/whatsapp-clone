import React from "react";
import Chat from "./Chat";
class ChatArea extends React.Component
{
  constructor(props)
  {
    super(props);

    this.userID = props.userID;
    this.username = props.username;
    this.chats = null;
    this.messages = null;
    this.messageInputRef = React.createRef();

  }


  componentDidUpdate()
  {
    this.messageInputRef.current.scrollTo(0, this.messageInputRef.current.scrollHeight);
  }

  render()
  {
    const {chatIndex} = this.props.getSelectedChatInformations();
    this.chats = this.props.chats;
    this.messages = this.chats[chatIndex].messages;

    if(this.messages == null)
    {

      return(
        <div className="chat-area">
          You don't have any messages...
        </div>
      );
      
    }
    else
    {
      return(
        <div 
          className="chat-area"
          ref={this.messageInputRef}
          >
          {
            this.messages.map(message => {
              /*
              _id
              chatID
              ownerID
              targetID
              roomName
              message
              datetime
              */
              const isOwner = (message.ownerID == this.userID) ? true : false;
              if(isOwner){
                console.log(message._id);
                return <Chat
                  key={message._id}
                  type="me"
                  isOwner={isOwner}
                  userID={this.userID}
                  username={this.username}
                  singleMessage={message}
                 />
              }else{
                return <Chat
                  key={message._id}
                  type="other"
                  isOwner={isOwner}
                  userID={this.userID}
                  username={this.username}
                  singleMessage={message}
                 />
              }
            })
          }
        </div>
        
      );
    }
    
    
  }
}
export default ChatArea;
