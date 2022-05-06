import React from "react";


import UserDefaultImage from "../../assets/images/user-image.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";

export default function UserInformation({type, userID, username}){
  return(
    <div className="user-information">
        <div className="user-image">
          <img src={UserDefaultImage}/>
        </div>
        <div className="username" title={`User ID:${userID} \nUsername:${username}`}>
        {username}
        </div>
        { 
          (typeof type != "undefined") ?  
          <div className="logout">
            <button><FontAwesomeIcon icon={icons.faSignOut}/> Logout</button>
          </div>: null
        }
    </div>
  );
}

