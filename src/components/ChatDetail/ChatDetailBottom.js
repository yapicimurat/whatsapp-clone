import React from "react";
import axios from "axios";
class ChatDetailBottom extends React.Component
{
  constructor(props)
  {
    super(props);


    this.state = {
      message: ""
    };

    this.keyDown = this.keyDown.bind(this);


    this.chatID = null;
    this.roomName = null;
    this.messages = null;
    this.targetUserID = null;
    this.targetUsername = null;
    this.ownerID = null;
    /*
      _id
      chatID
      ownerID
      targetID
      roomName
      message
      datetime
    */
   


  }

  keyDown(e){

    this.setState({
      message: e.target.value
    });

    //enter
    if(e.keyCode == 13){
      if(this.props.socket != null && this.props.socket != undefined && this.props.socket.connected == true){
        axios.get(`http://localhost:3005/send-message?chatID=${this.chatID}&ownerID=${this.props.userID}&targetID=${this.targetUserID}&message=${this.state.message}&roomName=${this.roomName}`)
        .then(response => {
          response = response.data;
          //const {error, value :{chatID, ownerID, targetID, roomName, datetime, message}} = response;
          this.props.socket.emit("SERVER-MESSAGE_TO_ROOM",{
            messageID: response.value._id,
            roomName: response.value.roomName,
            message: response.value.message,
            ownerID: response.value.ownerID,
            chatID: response.value.chatID,
            targetID: response.value.targetID,
            datetime: response.value.datetime
            }
          );
        })
        .catch(error => {
          alert(error.message);
        });
        
        
      }
      this.setState({
        message: ""
      })
    }
    
  }

  render()
  {
    const {chatID, roomName, messages, targetUserID, targetUsername, ownerID} = this.props.getSelectedChatInformations();
    this.chatID = chatID;
    this.roomName = roomName;
    this.messages = messages;
    this.targetUserID = targetUserID;
    this.targetUsername = targetUsername;
    this.ownerID = ownerID;

    return(
      <div className="chat-detail-bottom">
          <input 
            type="text" 
            placeholder="Bir şeyler yazın"
            onKeyDown={this.keyDown}
            value={this.state.message}
            onChange={this.keyDown}/>
      </div>
    );
  }

}
export default ChatDetailBottom;
