import React from "react";
import Chat from "./Chat";



export default function ChatArea({userID, username, messages}){
  //const messageInputRef = React.createRef();
    if(messages.length === 0)
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
          //ref={this.messageInputRef}
          >
          {
            messages.map(message => {
              /*
              _id
              chatID
              ownerID
              targetID
              roomName
              message
              datetime
              */
              const isOwner = (message.ownerID == userID) ? true : false;
              if(isOwner){

                return <Chat
                  key={message._id}
                  type="me"
                  isOwner={isOwner}
                  userID={userID}
                  username={username}
                  singleMessage={message}
                 />
              }else{
                return <Chat
                  key={message._id}
                  type="other"
                  isOwner={isOwner}
                  userID={userID}
                  username={username}
                  singleMessage={message}
                 />
              }
            })
          }
        </div>
        
      );
    }

}



// class ChatArea extends React.Component
// {
//   constructor(props)
//   {
//     super(props);

//     this.userID = props.userID;
//     this.username = props.username;
//     this.chats = null;
//     this.messages = null;
//     this.messageInputRef = React.createRef();

//   }


//   componentDidUpdate()
//   {
//     this.messageInputRef.current.scrollTo(0, this.messageInputRef.current.scrollHeight);
//   }

//   render()
//   {
    

    
    
    
//   }
// }
// export default ChatArea;
