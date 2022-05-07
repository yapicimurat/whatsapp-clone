import React from "react";
import { useSelector } from "react-redux";
import UserInformation from "../User/UserInformation";
import ChatArea from "./ChatArea";
import ChatDetailBottom from "./ChatDetailBottom";



/*
PROPS
userID={this.userID}
username={this.username}
chats={this.chats}
getSelectedChatInformations={this.getSelectedChatInformations}
socket={this.socket}
*/


export default function ChatDetail(){

  const chat = useSelector(state => state.chatReducer.selectedChat);
  const {_id: chatID, roomName, ownerID, targetID, targetUser, ownerUser, messages} = chat;
  console.log(chat);
  const targetUsername = targetUser[0].username;
  
  // isLogged: false,
  //   isSocketConnected: false,
  //   id: undefined,
  //   username: undefined,
  //   socketID: undefined
  const {id: userID, username} = useSelector(state => state.userReducer);
  
  
  return (
    <div className="chat-detail-area">
      <UserInformation
        userID={targetID}
        username={targetUsername}/>
      <div className="chat-detail">
        <ChatArea
          userID={userID}
          username={username}
          messages={messages}/>
      </div>
      <ChatDetailBottom  
        chat={chat}
        userID={userID}
        username={username}/>
    </div>
  );

};
// class ChatDetail extends React.Component {
//   constructor(props) {
//     super(props);
    
//     this.userID = props.userID;
//     this.username = props.username;
//     this.chats = null;

//     this.chatID = null;
//     this.targetUserID = null;
//     this.targetUsername = null;

//   }


//   render() {
//     const {chatID, roomName, targetUserID, targetUsername} = this.props.getSelectedChatInformations();
//     this.chatID = chatID;
//     this.roomName = roomName;
//     this.targetUsername = targetUsername;
//     this.targetUserID = targetUserID;

//     this.chats = this.props.chats;
    
//     return (
//       <div className="chat-detail-area">
//         <UserInformation
//           userID={this.targetUserID}
//           username={this.targetUsername}
//         />
//         <div className="chat-detail">
//           <ChatArea
//             userID={this.userID}
//             username={this.username}
//             chats={this.chats}
//             getSelectedChatInformations={this.props.getSelectedChatInformations}
//             socket={this.props.socket}
//           />
//         </div>
//         <ChatDetailBottom 
//           userID={this.props.userID}
//           username={this.props.username}
//           socket={this.props.socket}
//           getSelectedChatInformations={this.props.getSelectedChatInformations}
//         />
//       </div>
//     );
    

//   }


// }
// export default ChatDetail;
