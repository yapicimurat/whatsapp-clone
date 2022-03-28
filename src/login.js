import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import LoginService from "./User/loginService";
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
      new LoginService(username, password).login()
      .then(data => {
        this.props.applyUserInformations(data);
        this.props.connectSocket();
      })
      .catch(() => {

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
