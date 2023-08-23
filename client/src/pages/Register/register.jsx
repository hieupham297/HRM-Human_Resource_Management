/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./register.css";
import axios from "axios";

export const Register = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const registerData = {
      fullName,
      userName,
      password,
      email,
      phoneNumber,
    };

    try {
      axios
        .post("http://localhost:5000/user/register", registerData)
        .then((res) => {
          if (res.data.status === "Sucessful") {
            window.alert(res.data.message);
            window.location.reload();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleRegisterSucess = () => {
    setFullName("");
    setUserName("");
    setPassword("");
    setEmail("");
    setPhoneNumber("");
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
          <label className="login-label">Full Name</label>
          <input
            type="text"
            className="login-input"
            required
            onChange={(e) => setFullName(e.target.value)}
          />
          <label className="login-label">Username</label>
          <input
            type="text"
            className="login-input"
            required
            onChange={(e) => setUserName(e.target.value)}
          />
          <label className="login-label">Password</label>
          <input
            type="password"
            className="login-input"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="login-label">Email Address</label>
          <input
            type="email"
            className="login-input"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="login-label">Phone Number</label>
          <input
            type="text"
            className="login-input"
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <div className="policy">
            <div>
              <input type="checkbox" />
              <span>Yes, I want to recieve HR-Manage newsettlers</span>
            </div>
            <div>
              <input type="checkbox" />
              <span>
                I agree to all the <a>Terms, Private Policy</a>
              </span>
            </div>
            <button
              className="btn-login"
              style={{ marginBottom: "20px", marginTop: "50px" }}
              onClick={handleRegister}
            >
              Sign Up
            </button>
            <span>
              Already have an account?{" "}
              <span className="login-label">
                <a href="/login">Login</a>
              </span>{" "}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
