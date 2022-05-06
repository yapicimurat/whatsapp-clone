import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/css/style.css";

import NotFound from "./components/User/NotFound";

import {useSelector} from "react-redux";


//APP SETTINGS

import settings from "./app/";


//END APP SETTINGS

export default function App(){

  const {routes} = settings;

  const {isLogged, isSocketConnected} = useSelector(state => state.userReducer);

  return (
    <Router>
      <Routes>
        {
          routes.map((route, index) => {
            if(!route.needAuth){
              return <Route key={index}  exact={route.exact} path={route.path} element={route.component}></Route>
            }
            else if(route.needAuth && (isLogged && isSocketConnected)){
              return <Route key={index}  exact={route.exact} path={route.path} element={route.component}></Route> 
            }
            else{
              return <Route key={index} exact path="*" element={<NotFound/>}/>
            }
          })
        }
        
      </Routes>
    </Router>
  );
    
}
// class App extends React.Component {
//   constructor(props) {
//     super(props);


//     this.page = props.page;

//     //LOGGED IN USER INFORMATIONS
//     this.isLogged = false;
//     this.userID = null;
//     this.username = null;
//     this.chats = null;
//     this.socket = null;

//     //SELECTED CHAT INFORMATIONS
//     this.selectedChatID = null;
//     this.selectedChatIndex = null;
//     this.selectedChatRoomName = null;
//     this.selectedChatUserID = null;
//     this.selectedChatUsername = null;
//     this.selectedChatOwnerID = null;
//     this.selectedChatTargetID = null;


//     //STATE INFORMATIONS
//     this.state = {
//       page: this.page,
//       isLogged: this.isLogged,
//     };

//     this.applySelectedChatInformations = this.applySelectedChatInformations.bind(this);
//     this.getSelectedChatInformations = this.getSelectedChatInformations.bind(this);
//     this.applyChats = this.applyChats.bind(this);
//   }

//   applyChats(chats) {
//     this.chats = chats;
//     this.setState({});
//   }


//   applySelectedChatInformations(chatID) {
//     this.chats.forEach((chat, index) => {
//       if (chat._id == chatID) {
//         this.selectedChatID = chatID;
//         this.selectedChatIndex = index;
//         this.selectedChatRoomName = chat.roomName;
//         this.selectedChatOwnerID = chat.ownerUser[0]._id;
//         this.selectedChatTargetID = chat.targetUser[0]._id;
//         const isOwner = (chat.ownerUser[0]._id == this.userID) ? true : false;
//         if (isOwner) {
//           this.selectedChatUserID = chat.targetUser[0]._id;
//           this.selectedChatUsername = chat.targetUser[0].username;

//         }
//         else {
//           this.selectedChatUserID = chat.ownerUser[0]._id;
//           this.selectedChatUsername = chat.ownerUser[0].username;
//         }
//         this.setState({});
//       }
//     });
//   }

//   getSelectedChatInformations() {
//     return {
//       chatID: this.selectedChatID,
//       chatIndex: this.selectedChatIndex,
//       ownerID: this.selectedChatOwnerID,
//       targetID: this.selectedChatTargetID,
//       roomName: this.selectedChatRoomName,
//       targetUserID: this.selectedChatUserID,
//       targetUsername: this.selectedChatUsername
//     }
//   }


  


//   render() {

    

    


//   }


// }



//AŞAĞIDAKİ YORUMLANMIŞ KODLAR RENDER İÇERİSİNDE YER ALACAK KODLAR

    //   let page = this.state.page;
    //   if (this.isLogged) {
    //     page = "chat";
    //   }

    //   switch (page) {
    //     case "welcome":
    //       return (
    //         <Welcome
    //           applyUserInformations={this.applyUserInformations}
    //           connectSocket={this.connectSocket}
    //           appGoToPage={this.goToPage}
    //           operation="login" />
    //       );
    //       break;

    //     case "chat":
    //       if (this.state.connectedSocket == true) {
    //         return (
    //           <div className="app">
    //             <ChatList
    //               userID={this.userID}
    //               username={this.username}
    //               chats={this.chats}
    //               isUserLogged={this.checkIsUserLogged}
    //               applySelectedChatInformations={this.applySelectedChatInformations}
    //               getSelectedChatInformations={this.getSelectedChatInformations}
    //               getChats={this.getChats}
    //               applyChats={this.applyChats}
    //               socket={this.socket}
    //             />
    //             {
    //               (this.selectedChatID != null) ? <ChatDetail
    //                 userID={this.userID}
    //                 username={this.username}
    //                 chats={this.chats}
    //                 getSelectedChatInformations={this.getSelectedChatInformations}
    //                 socket={this.socket}
    //               /> : null
    //             }


    //           </div>
    //         );
    //       }
    //       else {
    //         return (
    //           <div>
    //             Connecting the socket server...
    //           </div>
    //         );
    //       }

    //       break;

    //     case "app-loading":
    //       return (
    //         <div className="app-loading">
    //           <img src={loadingIcon} />
    //           <p>Loading...</p>
    //         </div>

    //       );
    //       break;

    //     default:
    //       //page error -> not found fırlat
    //       return (
    //         <div className="not-found">
    //           <h2>404 Not Found</h2>

    //           <a href="#" onClick={() => this.goToPage("welcome")}><FontAwesomeIcon icon={icons.faArrowLeft} /> Go to welcome page</a>
    //         </div>
    //       );
    //       break;

    //   }