import React from "react";
import UserDefaultImage from "./user-image.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";

class UserInformation extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render(){
    return(
      <div className="user-information">
          <div className="user-image">
            <img src={UserDefaultImage}/>
          </div>
          <div className="username" title={`User ID:${this.props.userID} \nUsername:${this.props.username}`}>
          {this.props.username}
          </div>
          { 
            (typeof this.props.type != "undefined") ?  
            <div className="logout">
              <button><FontAwesomeIcon icon={icons.faSignOut}/> Logout</button>
            </div>: null
          }
      </div>
    );
  }


}
export default UserInformation;
