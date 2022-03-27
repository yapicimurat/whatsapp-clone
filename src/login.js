import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    if (username == "" || password == "") {
      alert("Please enter all of informations.");
    }
    else {
      axios.get(`http://localhost:3005/login?username=${username}&password=${password}`)
        .then(res => {
          const { data } = res;
          if (!data.error) {
            alert(data.message.login);
            /*
              response uzerinden alinmasi gereken bilgileri
              userID                => data.value.login[0]._id
              username              => data.value.login[0].username
              chats                 => data.value.chats (array)
                  chatID            => data.value.chats[i]._id;
                  roomName          => data.value.chats[i].roomName;
                  ownerID           => data.value.chats[i].ownerUser[0]._id
                  ownerUsername     => data.value.chats[i].ownerUser[0].username
                  targetID          => data.value.chats[i].targetUser[0]._id
                  targetUsername    => data.value.chats[i].targetUser[0].username
                  messages          => data.value.chats[i].messages
            */
            let transferData = {
              userID: data.value.login[0]._id,
              username: data.value.login[0].username,
              chats: data.value.chats
            };
            this.props.applyUserInformations(transferData);
            this.props.connectSocket();
          }
          else {
            alert(data.message.login);
          }

        }).catch(error => {
          alert(error);
        });
    }
  }

  changeValue(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="login-register">
        <form onSubmit={this.handleSubmit}>
          <label>Username</label>
          <input type="text" name="username" value={this.state.username} onChange={this.changeValue} />
          <label>Password</label>
          <input type="password" name="password" value={this.state.password} onChange={this.changeValue} />
          <button className="login-button"><FontAwesomeIcon icon={icons.faSignIn} /> Login</button>

          <small>Are you not registered? <a href="#" onClick={() => this.props.setOperation("register")}>Register now</a></small>
        </form>
      </div>
    );
  }


}
export default Login;
