/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import Cookies from "js-cookie";
import { validatePassword, validateUsername } from "../../utils/validateForm";

export const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameErr, setUserNameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setUserNameErr("");
    setPasswordErr("");
    setMessage("");

    const loginData = { userName, password };

    const userNameErr = validateUsername(userName);
    const passwordErr = validatePassword(password);

    if (userNameErr || passwordErr) {
      setUserNameErr(userNameErr);
      setPasswordErr(passwordErr);
      return;
    }
    try {
      axios.post("http://localhost:5000/user/login", loginData).then((res) => {
        if (res.data.status === "Sucessful") {
          let userData = res.data.userData;
          console.log(res.data.userData, res.data.token);
          Cookies.set("userData", JSON.stringify(userData), {
            expires: 1,
          });
          Cookies.set("token", res.data.token);
          
          window.location.href = "/homepage";
        } else if (res.data.status === "Error") {
          setMessage(res.data.message);
        }
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-box">
        <h1
          className="logo-white"
          style={{ color: "#253d90", fontSize: "35px" }}
        >
          HR-<span style={{ color: "#FFC20E" }}>Manage</span>
        </h1>
        <h1>LOGIN</h1>
        <h4>Login to your account</h4>
        <div className="field-container">
          <label className="login-label">Username</label>
          <input
            type="text"
            className="login-input"
            placeholder="Enter username ..."
            required
            onChange={(e) => setUserName(e.target.value)}
          />
          {userNameErr ? (
            <div className="error">{userNameErr}</div>
          ) : (
            <div className="error">&nbsp;</div>
          )}
        </div>
        <div className="field-container">
          <label className="login-label">Password</label>
          <input
            type="password"
            className="login-input"
            placeholder="Enter password ..."
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordErr ? (
            <div className="error">{passwordErr}</div>
          ) : (
            <div className="error">&nbsp;</div>
          )}
          {message ? (
            <div className="error">{message}</div>
          ) : (
            <div className="error">&nbsp;</div>
          )}
        </div>

        <div className="remember">
          <div>
            <input type="checkbox" />
            <span>Remember me</span>
          </div>
          <span className="login-label">
            <a>Forgot Password?</a>
          </span>
        </div>
        <div className="wrapper">
          <button className="btn-login" onClick={handleLogin}>
            Sign In
          </button>
        </div>

        <p>
          Do you have an account yet?{" "}
          <span className="login-label">
            <a href="/register">Create account</a>
          </span>{" "}
        </p>
      </form>
      <div className="ads">
        <h1 className="title">
          Manage all <span style={{ color: "#FFC20E" }}>HR Operations</span>{" "}
          from the comfort of your home{" "}
        </h1>
      </div>
    </div>
  );
};
