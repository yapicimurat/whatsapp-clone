import React from "react";
import {useNavigate} from "react-router-dom";

import UserDefaultImage from "../../assets/images/user-image.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";

export default function UserInformation({type, userID, username}){

  const navigate = useNavigate();
  const logout = (e) => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };
  return(
    <div className="user-information">
        <div className="user-image">
          <img src={UserDefaultImage}/>
        </div>
        <div className="username" title={`User ID:${userID} \nUsername:${username}`}>
        {username}
        </div>
        { 
          (type !== "chat") ?  
          <div className="logout">
            <button onClick={logout}><FontAwesomeIcon icon={icons.faSignOut}/> Logout</button>
          </div>: null
        }
    </div>
  );
}

