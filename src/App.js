import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./features/user/user";
import { setChats } from "./features/chat/chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/css/style.css";
import NotFound from "./components/User/NotFound";
import {useSelector} from "react-redux";

//APP SETTINGS

import settings from "./app/";
import { API_TYPES } from "./app/api/api";
import axios from "axios";
import { connectSocket } from "./app/socket/socket";
//END APP SETTINGS

export default function App(){

  const dispatch = useDispatch();

  const {routes} = settings;

  const {isLogged, isSocketConnected} = useSelector(state => state.userReducer);

  //the userToken is exist and if user is not logged in before...
  if(JSON.parse(localStorage.getItem('userToken')) && !isLogged){
    //sign in...
    axios.get(API_TYPES.GET_USER(),{
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`
      }
    })
    .then(async (response) => {
      const {result} = response.data;
      dispatch(setChats(result.chats));
      dispatch(setUser({
        isLogged: true,
        socket: await connectSocket(),
        username: result.login.username,
        id: result.login._id
      }));

     
    });
  }
    return (
      <Router>
        <Routes>
          {
            routes.map((route, index) => {
              if(!route.needAuth){
                return <Route key={index} exact={route.exact} path={route.path} element={route.component}></Route>
              }
              else if(route.needAuth && (isLogged && isSocketConnected)){
                return <Route key={index}  exact={route.exact} path={route.path} element={route.component}></Route> 
              }
              else if(route.needAuth && !(isLogged && isSocketConnected)){
                return <Route key={index} exact={route.exact} path={route.path} element={route.alternativeComponent}></Route>
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