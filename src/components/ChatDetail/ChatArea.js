import React, {useRef, useEffect} from "react";
import Chat from "./Chat";

export default function ChatArea({userID, username, messages}){

  const chatArea = useRef();

  useEffect(() => {
    chatArea.current.scrollTo(0, chatArea.current.scrollHeight);
  });


  return(
    
    <div className="chat-area" ref={chatArea}>
      {
        messages.map(message => {
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


