/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import {
  validateEmail,
  validateFullName,
  validatePassword,
  validatePhoneNumber,
  validateRepeatPassword,
  validateUsername,
} from "../../utils/validateForm";

export const Register = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [fullNameErr, setFullNameErr] = useState("");
  const [userNameErr, setUserNameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [repeatPasswordErr, setRepeatPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [phoneNumberErr, setPhoneNumberErr] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setFullNameErr("");
    setUserNameErr("");
    setPasswordErr("");
    setRepeatPasswordErr("");
    setEmailErr("");
    setPhoneNumberErr("");
    setMessage("");

    const registerData = {
      fullName,
      userName,
      password,
      repeatPassword,
      email,
      phoneNumber,
    };

    const fullNameErr = validateFullName(fullName);
    const userNameErr = validateUsername(userName);
    const passwordErr = validatePassword(password);
    const re_passwordErr = validateRepeatPassword(password, repeatPassword);
    const emailErr = validateEmail(email);
    const phoneNumberErr = validatePhoneNumber(phoneNumber);

    if (
      fullNameErr ||
      userNameErr ||
      passwordErr ||
      re_passwordErr ||
      emailErr ||
      phoneNumberErr
    ) {
      setFullNameErr(fullNameErr);
      setUserNameErr(userNameErr);
      setPasswordErr(passwordErr);
      setRepeatPasswordErr(re_passwordErr);
      setEmailErr(emailErr);
      setPhoneNumberErr(phoneNumberErr);
      return;
    }
    try {
      axios
        .post("http://localhost:5000/user/register", registerData)
        .then((res) => {
          if (res.data.status === "Sucessful") {
            window.alert(res.data.message);
            window.location.href = "/login";
          } else if (res.data.status === "Error") {
            setMessage(res.data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="register-content">
      <div className="left">
        <h1 className="logo" style={{ color: "#ffffff" }}>
          HR-<span style={{ color: "#FFC20E" }}>Manage</span>
        </h1>
        <h2 className="text" style={{ fontSize: "35px" }}>
          HR Management Platform
        </h2>
        <span className="text" style={{ fontSize: "20px" }}>
          Manage all employees, payrolls, and other human resource operations.
        </span>
        <div className="learn-more">
          <button className="btn-learn-more">Learn More</button>
          <button className="btn-our-feature">Our Features</button>
        </div>
      </div>
      <div className="right">
        <h1>Welcome to HR-Manage</h1>
        <h4>Register your account</h4>
        <form className="register-form">
          <div className="input-group">
            <div className="field-container">
              <label>
                Username <span className="error">*</span>
              </label>
              <input
                type="text"
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
              <label>
                Password <span className="error">*</span>
              </label>
              <input
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordErr ? (
                <div className="error">{passwordErr}</div>
              ) : (
                <div className="error">&nbsp;</div>
              )}
            </div>
            <div className="field-container">
              <label>
                Re-enter the password <span className="error">*</span>
              </label>
              <input
                type="password"
                required
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
              {repeatPasswordErr ? (
                <div className="error">{repeatPasswordErr}</div>
              ) : (
                <div className="error">&nbsp;</div>
              )}
              {message ? (
                <div className="error">{message}</div>
              ) : (
                <div className="error">&nbsp;</div>
              )}
            </div>
          </div>
          <div className="input-group">
            <div className="field-container">
              <label>
                Fullname <span className="error">*</span>
              </label>
              <input
                type="text"
                required
                onChange={(e) => setFullName(e.target.value)}
              />
              {fullNameErr ? (
                <div className="error">{fullNameErr}</div>
              ) : (
                <div className="error">&nbsp;</div>
              )}
            </div>

            <div className="field-container">
              <label>
                Email address <span className="error">*</span>
              </label>
              <input
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailErr ? (
                <div className="error">{emailErr}</div>
              ) : (
                <div className="error">&nbsp;</div>
              )}
            </div>
            <div className="field-container">
              <label>Phone number</label>
              <input
                type="text"
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {phoneNumberErr ? (
                <div className="error">{phoneNumberErr}</div>
              ) : (
                <div className="error">&nbsp;</div>
              )}
            </div>
          </div>
        </form>
        <div className="policy">
          <button
            className="btn-login"
            style={{ width: "50%", marginBottom: "20px", marginTop: "50px" }}
            onClick={handleRegister}
          >
            Sign Up
          </button>
          <span>
            Already have an account?{" "}
            <span>
              <a
                href="/login"
                style={{
                  textDecoration: "none",
                  color: "#253d90",
                  fontWeight: "bold",
                }}
              >
                Login
              </a>
            </span>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};
