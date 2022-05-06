import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import RegisterService from "../../User/registerService";



export default function Register() {
  //state hook
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (username == "" || password == "" || passwordVerify == "") {
      alert("Please enter all required informations.");
    }
    else if (password != passwordVerify) {
      alert("Passwords do not match.");
    }
    else {
      //tum durumlar kontrol edildi kullanici icin kayit islemi baslatilabilir
      new RegisterService().register(username, password)
        .then(data => {
          alert(data);
          window.location.href = "/login";
        })
        .catch(err => {
          alert(err);
        });
    }
  };

  const changeValue = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "passwordVerify") {
      setPasswordVerify(e.target.value);
    }
  };


  return (
    <div className="login-register">
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" name="username" value={username} onChange={changeValue} />
        <label>Password</label>
        <input type="password" name="password" value={password} onChange={changeValue} />
        <label>Password verify</label>
        <input type="password" name="passwordVerify" value={passwordVerify} onChange={changeValue} />
        <button className="login-button"><FontAwesomeIcon icon={icons.faUserPlus} /> register</button>
        <small>Are you registered? <a href="/login">Login now</a></small>
      </form>
    </div>
  );
}