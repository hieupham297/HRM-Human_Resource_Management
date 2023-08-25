import React, { useState } from "react";
import "./addEmployee.css";
import { Sidebar } from "../../components/Sidebar/sidebar";
import axios from "axios";
import {
  validateEmail,
  validateFullName,
  validatePhoneNumber,
  isNull,
} from "../../utils/validateForm";

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

  const [employeeCodeErr, setEmployeeCodeErr] = useState("");
  const [fullNameErr, setFullNameErr] = useState("");
  const [dobErr, setDobErr] = useState("");
  const [genderErr, setGenderErr] = useState("");
  const [hometownErr, setHometownErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [phoneNumberErr, setPhoneNumberErr] = useState("");
  const [jobCategoryErr, setJobCategoryErr] = useState("");
  const [jobTitleErr, setJobTitleErr] = useState("");
  const [startDateErr, setStartDateErr] = useState("");

  const handleAddNew = (e) => {
    e.preventDefault();

    setEmployeeCodeErr("");
    setFullNameErr("");
    setDobErr("");
    setGenderErr("");
    setHometownErr("");
    setEmailErr("");
    setPhoneNumberErr("");
    setJobCategoryErr("");
    setJobTitleErr("");
    setStartDateErr("");

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

    const employeeCodeErr = isNull(employeeCode);
    const fullNameErr = validateFullName(fullName);
    const dobErr = isNull(dob);
    const genderErr = isNull(gender);
    const hometownErr = isNull(hometown);
    const emailErr = validateEmail(email);
    const phoneNumberErr = validatePhoneNumber(phoneNumber);
    const jobCategoryErr = isNull(jobCategory);
    const jobTitleErr = isNull(jobTitle);
    const startDateErr = isNull(startDate);

    if (
      employeeCodeErr ||
      fullNameErr ||
      dobErr ||
      genderErr ||
      hometownErr ||
      emailErr ||
      phoneNumberErr ||
      jobCategoryErr ||
      jobTitleErr ||
      startDateErr
    ) {
      setEmployeeCodeErr(employeeCodeErr);
      setFullNameErr(fullNameErr);
      setDobErr(dobErr);
      setGenderErr(genderErr);
      setHometownErr(hometownErr);
      setEmailErr(emailErr);
      setPhoneNumberErr(phoneNumberErr);
      setJobCategoryErr(jobCategoryErr);
      setJobTitleErr(jobTitleErr);
      setStartDateErr(startDateErr);
      return;
    }

    try {
      axios
        .post("http://localhost:5000/hrm/addNewEmployee", newData)
        .then((res) => {
          console.log(res.data.status);
          if (res.data.status === "Sucessful") {
            window.alert("You have already added a new profile");
            window.location.href = "/homepage";
          } else {
            window.alert("Failed to add new employee");
            console.log("Failed to add new employee");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="addEmployee">
      <Sidebar />
      <div className="addEmployee-container">
        <form action="" className="addEmployee-form">
          <div
            className="input-group"
            style={{ height: "680px", width: "500px" }}
          >
            <div className="field-container">
              <label>
                Employee code <span className="error">*</span>
              </label>
              <input
                type="text"
                required
                onChange={(e) => setEmployeeCode(e.target.value)}
              />
              {employeeCodeErr ? (
                <div className="error">{employeeCodeErr}</div>
              ) : (
                <div className="error">&nbsp;</div>
              )}
            </div>
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
                Date of birth <span className="error">*</span>
              </label>
              <input
                type="date"
                required
                onChange={(e) => setDob(e.target.value)}
              />
              {dobErr ? (
                <div className="error">{dobErr}</div>
              ) : (
                <div className="error">&nbsp;</div>
              )}
            </div>
            <div className="field-container">
              <label>
                Gender <span className="error">*</span>
              </label>
              <input
                type="text"
                required
                onChange={(e) => setGender(e.target.value)}
              />
              {genderErr ? (
                <div className="error">{genderErr}</div>
              ) : (
                <div className="error">&nbsp;</div>
              )}
            </div>
            <div className="field-container">
              <label>
                Hometown <span className="error">*</span>
              </label>
              <input
                type="text"
                required
                onChange={(e) => setHometown(e.target.value)}
              />
              {hometownErr ? (
                <div className="error">{hometownErr}</div>
              ) : (
                <div className="error">&nbsp;</div>
              )}
            </div>
          </div>
          <div
            className="input-group"
            style={{ height: "680px", width: "500px" }}
          >
            <div className="field-container">
              <label>
                Email <span className="error">*</span>
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
                type="email"
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {phoneNumberErr ? (
                <div className="error">{phoneNumberErr}</div>
              ) : (
                <div className="error">&nbsp;</div>
              )}
            </div>
            <div className="field-container">
              <label>
                Job category <span className="error">*</span>
              </label>
              <input
                type="text"
                required
                onChange={(e) => setJobCategory(e.target.value)}
              />
              {jobCategoryErr ? (
                <div className="error">{jobCategoryErr}</div>
              ) : (
                <div className="error">&nbsp;</div>
              )}
            </div>
            <div className="field-container">
              <label>
                Job title <span className="error">*</span>
              </label>
              <input
                type="text"
                required
                onChange={(e) => setJobTitle(e.target.value)}
              />
              {jobTitleErr ? (
                <div className="error">{jobTitleErr}</div>
              ) : (
                <div className="error">&nbsp;</div>
              )}
            </div>
            <div className="field-container">
              <label>
                Start date <span className="error">*</span>
              </label>
              <input
                type="date"
                required
                onChange={(e) => setStartDate(e.target.value)}
              />
              {startDateErr ? (
                <div className="error">{startDateErr}</div>
              ) : (
                <div className="error">&nbsp;</div>
              )}
            </div>
          </div>
        </form>
        <div className="button-container">
          <button
            className="add-btn"
            style={{
              backgroundColor: "#253d90",
              margin: "0 auto",
            }}
            onClick={handleAddNew}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
