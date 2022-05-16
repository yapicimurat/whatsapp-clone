import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/css/style.css";
import NotFound from "./components/User/NotFound";
import {useSelector, useDispatch} from "react-redux";

//APP SETTINGS

import settings from "./app/";

//END APP SETTINGS

export default function App(){

  const {routes} = settings;

  const {isLogged, isSocketConnected, socket} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  


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