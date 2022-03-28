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
    this.filterText = null;

    this.setFilterText = this.setFilterText.bind(this);

    this.filterMode = false;
  }

 

  //bu kısımda(chatList) filtrelemenin eyleme donusebilmesi icin bu fonksiyonu olusturdum.
  //bu fonksiyon child parent(chatListFilter) tarafindan kullanilip chatlist re-list islemi gerceklestiriliyor
  setFilterText(value){
    this.filterMode = true;
    
    if(value == "")
      this.filterMode = false;
    this.filterText = value;
    this.setState({});
  }

  render(){
    const chats = (this.filterMode == false) ? this.props.chats : this.props.chats.filter(chat => {
      const isOwner = (chat.ownerID == this.userID) ? true : false;
      const chatUsername = (!isOwner) ? chat.ownerUser[0].username : chat.targetUser[0].username;
      return chatUsername.includes(this.filterText);
    });
    if(Array.isArray(chats) && chats.length > 0)
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
              setFilterText={this.setFilterText}
              applyChats={this.props.applyChats}
              socket={this.props.socket}
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
                      getSelectedChatInformations={this.props.getSelectedChatInformations}
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
    else
    {
      return(
        <div className="chat-list-area">
            <UserInformation 
              userID={this.props.userID}
              username={this.props.username}
              getSelectedChatInformations={this.props.getSelectedChatInformations}
             />
            <ChatListFilter
              userID={this.props.userID}
              username={this.props.username}
              setFilterText={this.setFilterText}
              applyChats={this.props.applyChats}
              socket={this.props.socket}
            />
            <div className="chat-list">
              <div className="no-chat">You don't have any chat with someone.</div>
            </div>
        </div>
      );
    }
    
  }


}
export default ChatList;
