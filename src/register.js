import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import RegisterService from "./User/registerService";

class Register extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
        username: "",
        password: "",
        passwordVerify: ""
    };


    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeValue = this.changeValue.bind(this);
    
  }


  handleSubmit(e)
  {
    e.preventDefault();

    const {username, password, passwordVerify} = this.state;

    if(username == "" || password == "" || passwordVerify == "")
    {
        alert("Please enter all of informations.");
    }
    else if(password != passwordVerify)
    {
        alert("Passwords do not match.");
    }
    else
    {
        //tum durumlar kontrol edildi kullanici icin kayit islemi baslatilabilir
        new RegisterService().register(username, password)
        .then(data => {
          alert(data);
        })
        .catch(err => {
          alert(err);
        });
    }


  }

  changeValue(e)
  { 
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  render(){
    return (
        <div className="login-register">
        <form onSubmit={this.handleSubmit}>
            <label>Username</label>
            <input type="text" name="username" value={this.state.username} onChange={this.changeValue}/>
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.changeValue}/>
            <label>Password verify</label>
            <input type="password" name="passwordVerify" value={this.state.passwordVerify} onChange={this.changeValue}/>
            <button className="login-button"><FontAwesomeIcon icon={icons.faUserPlus}/> register</button>
            <small>Are you registered? <a href="#" onClick={() => this.props.setOperation("login")}>Login now</a></small>
        </form>
    </div>
    );
  }


}
export default Register;
