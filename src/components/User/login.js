//REACT IMPORTS
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
//END REACT IMPORTS

//REDUCERS....
import { setUser } from "../../features/user/user";
import { setChats } from "../../features/chat/chat";
//END REDUCERS...

//ASSETS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import loadingGif from "../../assets/images/loading.gif";
//END ASSETS

import LoginService from "../../User/loginService";

//SOCKET IMPORTS
import { connectSocket } from "../../app/socket/socket";
import socketConfig from "../../app/socket/config";

//END SOCKET IMPORTS...

export default function Login(props) {
  const [username, setUsernameState] = useState("");
  const [password, setPasswordState] = useState("");
  const [isConnectingSocket, setIsConnectingSocket] = useState(false);
  const navigate = useNavigate();
  //redux
  const dispatch = useDispatch();
  const isSocketConnected = useSelector(state => (state.userReducer.socket != null) ? state.userReducer.socket.connected : false);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username == "" || password == "") {
      alert("Please enter all of informations.");
    }
    else {
      new LoginService().login(username, password)
        .then(response => {
          setIsConnectingSocket(true);
          setStates(response);
        })
        .catch(err => {
          alert(err);
        });
    }
  }

  const setStates = (response) => {
    connectSocket()
      .then(socket => {
        
        socket.emit(socketConfig.ACTIONS.SERVER_CONNECT_ROOMS, {
          roomNames: response.chats.map(chat => chat.roomName)
        });

        dispatch(setUser({
          isLogged: true,
          socket: socket,
          username: response.username,
          id: response.userID
        }));
        
        dispatch(setChats(response.chats));
         
        navigate("/chat");
      })
      .catch(error => {
        setIsConnectingSocket(false);
      });
  }

  const changeValue = (e) => {
    if (e.target.name === "username") {
      setUsernameState(e.target.value);
    }
    else if (e.target.name === "password") {
      setPasswordState(e.target.value);
    }
  }
  
  return (
    <div className="login-register">
      <form onSubmit={handleSubmit}>
        {
          (isConnectingSocket && !isSocketConnected) ? (
            <div style={{ textAlign: "center" }}>
              <small>Connecting to socket server...</small><br />
              <img className="mini-loading" src={loadingGif} />
            </div>
          ) : null
        }
        <label>Username</label>
        <input type="text" name="username" value={username} onChange={changeValue} />
        <label>Password</label>
        <input type="password" name="password" value={password} onChange={changeValue} />
        <button className="login-button"><FontAwesomeIcon icon={icons.faSignIn} /> Login</button>
        <small>Are you not registered? <a href="/register">Register now</a></small>
      </form>
    </div>
  );
}