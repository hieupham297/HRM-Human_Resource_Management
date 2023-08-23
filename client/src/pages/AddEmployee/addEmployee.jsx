import React, { useState } from "react";
import "./addEmployee.css";
import { Sidebar } from "../../components/Sidebar/sidebar";
import axios from "axios";

export const AddEmployee = () => {
  const [employeeCode, setEmployeeCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [hometown, setHometown] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [startDate, setStartDate] = useState("");

  const handleAddNew = (e) => {
    e.preventDefault();
    const newData = {
      employeeCode,
      fullName,
      dob,
      gender,
      hometown,
      email,
      phoneNumber,
      jobCategory,
      jobTitle,
      startDate,
    };
    console.log(newData);
    try {
      axios
        .post("http://localhost:5000/hrm/addNewEmployee",newData)
        .then((res) => {
          console.log(res.data.status);
          if (res.data.status === "Sucessful") {
            window.alert("You have already added a new profile");
            window.location.reload();
            handleAddSucess();
          } else {
            window.alert("Failed to add new employee");
            console.log("Failed to add new employee");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handleAddSucess = () => {
    setEmployeeCode("");
    setFullName("");
    setDob("");
    setGender("");
    setHometown("");
    setEmail("");
    setPhoneNumber("");
    setJobCategory("");
    setJobTitle("");
    setStartDate("");
  };

  return (
    <div className="addEmployee">
      <Sidebar />
      <form action="" className="addEmployee-form">
        <div className="column">
          <label className="login-label">Employee Code</label>
          <input
            type="text"
            className="login-input"
            required
            onChange={(e) => setEmployeeCode(e.target.value)}
          />
          <label className="login-label">Full Name</label>
          <input
            type="text"
            className="login-input"
            required
            onChange={(e) => setFullName(e.target.value)}
          />
          <label className="login-label">Date Of Birth</label>
          <input
            type="date"
            className="login-input"
            required
            onChange={(e) => setDob(e.target.value)}
          />
          <label className="login-label">Gender</label>
          <input
            type="text"
            className="login-input"
            required
            onChange={(e) => setGender(e.target.value)}
          />
          <label className="login-label">Hometown</label>
          <input
            type="text"
            className="login-input"
            required
            onChange={(e) => setHometown(e.target.value)}
          />
          <button
            className="add-btn"
            style={{ backgroundColor: "#253d90" }}
            onClick={handleAddNew}
          >
            Add
          </button>
        </div>
        <div className="column">
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
          <label className="login-label">Job Category</label>
          <input
            type="text"
            className="login-input"
            required
            onChange={(e) => setJobCategory(e.target.value)}
          />
          <label className="login-label">Job Title</label>
          <input
            type="text"
            className="login-input"
            required
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <label className="login-label">Start Date</label>
          <input
            type="date"
            className="login-input"
            required
            onChange={(e) => setStartDate(e.target.value)}
          />
          <button className="add-btn" style={{ backgroundColor: "red" }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
