import React from "react";
import UserInformation from "./UserInformation";
import ChatListFilter from "./ChatListFilter";
import ChatListInformation from "./ChatListInformation";
class ChatList extends React.Component
{
  constructor(props)
  {
    super(props);
    
    this.userID = props.userID;
    this.username = props.username;
    this.state = {
      isFounded: false
    };



    this.filterChatList = this.filterChatList.bind(this);
  }

  getChatList(){
    let isFounded = true;
    if(this.props.chats.length == 0){
      isFounded = false
    }
    this.setState({
      isFounded: isFounded
    })
  }

  componentDidMount()
  {
    this.getChatList();
  }


  filterChatList(){

  }

  render(){
    const isLoading = this.state.isLoading;
    const isFounded = this.state.isFounded;
    const chats = this.props.chats;
    if(!isLoading && isFounded)
    {
      return(
        <div className="chat-list-area">
            <UserInformation 
              userID={this.props.userID}
              username={this.props.username}
              />
            <ChatListFilter
              userID={this.props.userID}
              username={this.props.username}
              filterChatList={this.filterChatList}
            />
            <div className="chat-list">
              {
                chats.map((chat) => {
                  const isOwner = (chat.ownerID == this.userID) ? true : false;
                  const chatUsername = (!isOwner) ? chat.ownerUser[0].username : chat.targetUser[0].username;
                  return <ChatListInformation
                      key={chat._id}
                      userID={this.userID}
                      username={this.username}
                      isOwner={isOwner}
                      chatID={chat._id}
                      chats={this.props.chats}
                      ownerID={chat.ownerID}
                      targetID={chat.targetID}
                      chatUsername={chatUsername}
                      applySelectedChatInformations={this.props.applySelectedChatInformations}
                      lastMessage={(chat.messages.length > 0) ? chat.messages[chat.messages.length - 1].message : null}
                      lastMessageDatetime={(chat.messages.length > 0) ? chat.messages[chat.messages.length - 1].datetime : null}
                      
                    />
                })
              }
            </div>
        </div>
      );
    }
    else if(!isFounded)
    {
      return(
        <div className="chat-list-area">
            <UserInformation 
              userID={this.props.userID}
              username={this.props.username}
              getSelectedChatInformations={this.props.getSelectedChatInformations}
             />
            <ChatListFilter/>
            <div className="chat-list">
              <div className="no-chat">You don't have any chat with someone.</div>
            </div>
        </div>
      );
    }
    
  }


}
export default ChatList;
