import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import React from "react";
class ChatListFilter extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      filter: ""
    }

    this.changeEvent = this.changeEvent.bind(this);
  }

  changeEvent(event) {
    this.setState({
      filter: event.target.value
    });



  }

  keyDown(event) {
    //enter
    if (event.keyCode == 13) {
      if (this.state.filter == "") {
        
      }
      else {

      }
    }
  }

  render() {
    return (
      <form className="chat-list-filter">
        <FontAwesomeIcon className="chat-filter-search-icon" icon={icons.faSearch} />
        <input
          type="text"
          placeholder="Search a chat or create a new chat..."
          value={this.state.filter}
          onChange={this.changeEvent}
          onKeyDown={this.keyDown}
        />
        <button
          className="add-user"
          title="Send request to add new friend"
        ><FontAwesomeIcon icon={icons.faUserPlus} /></button>
      </form>
    );
  }


}
export default ChatListFilter;
