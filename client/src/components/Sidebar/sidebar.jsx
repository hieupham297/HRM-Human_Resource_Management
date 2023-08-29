/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./sidebar.css";
import axios from "axios";
import Cookies from "js-cookie";

export const Sidebar = (props) => {
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/user/logout");
      Cookies.remove("userData");
      Cookies.remove("token");
      window.location.href = "/";
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <div className="sidebar">
      <h1
        className="logo-white"
        style={{ color: "#ffffff", marginBottom: "70px" }}
      >
        HR-<span style={{ color: "#FFC20E" }}>Manage</span>
      </h1>
      <span className="account">
        Chào mừng:{" "}
        <span>{props.dataLoaded ? props.data.fullName : "Loading..."}</span>
      </span>
      <div className="menu">
        <span className="sidebar-title">Feature</span>
        <span className="sidebar-stack">
          <div className="sidebar-stack-main">
            {" "}
            <i className="fa-solid fa-user-tie icon"></i>{" "}
            <a href="/homepage">Employment Management</a>
          </div>
        </span>
        <span className="sidebar-stack">
          <div className="sidebar-stack-main">
            {" "}
            <i className="fa-solid fa-folder-plus icon"></i>
            <a href="/addEmployee">Add New Profile</a>
          </div>
        </span>
        <span className="sidebar-stack">
          <div className="sidebar-stack-main">
            {" "}
            <i className="fa-solid fa-envelope icon"></i> <a href="">Message</a>
          </div>
        </span>
        <span className="sidebar-title">Recruitment</span>
        <span className="sidebar-stack">
          <div className="sidebar-stack-main">
            {" "}
            <i className="fa-solid fa-briefcase icon"></i> Jobs
          </div>
        </span>
        <span className="sidebar-stack">
          <div className="sidebar-stack-main">
            {" "}
            <i className="fa-solid fa-user icon"></i> Candidates
          </div>
        </span>
        <span className="sidebar-stack">
          <div className="sidebar-stack-main">
            {" "}
            <i className="fa-solid fa-file-contract icon"></i> Resumes
          </div>
        </span>
        <span className="sidebar-title">Organization</span>
        <span className="sidebar-stack">
          <div className="sidebar-stack-main">
            {" "}
            <i className="fa-solid fa-book-open icon"></i> Leave Management
          </div>
        </span>
        <span className="sidebar-stack">
          <div className="sidebar-stack-main">
            <i className="fa-solid fa-scale-balanced icon"></i> Performance
            Management
          </div>{" "}
        </span>
      </div>
      <div className="wrapper-logout">
        <button className="log-out" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};
