/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./updateModal.css";
import { formatDate } from "../../utils/formatDate";
import axios from "axios";
import {
  validateEmail,
  validateFullName,
  validatePhoneNumber,
  isNull,
} from "../../utils/validateForm";

export const UpdateModal = (props) => {
  const [employeeCode, setEmployeeCode] = useState(
    props.employeeData.employeecode
  );
  const [fullName, setFullName] = useState(props.employeeData.fullname);
  const [dob, setDob] = useState(props.employeeData.dob);
  const [gender, setGender] = useState(props.employeeData.gender);
  const [hometown, setHometown] = useState(props.employeeData.hometown);
  const [email, setEmail] = useState(props.employeeData.email);
  const [phoneNumber, setPhoneNumber] = useState(
    props.employeeData.phonenumber
  );
  const [jobCategory, setJobCategory] = useState(
    props.employeeData.jobcategory
  );
  const [jobTitle, setJobTitle] = useState(props.employeeData.jobtitle);
  const [startDate, setStartDate] = useState(props.employeeData.startdate);

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

  const handleUpdate = () => {
    setFullNameErr("");
    setDobErr("");
    setGenderErr("");
    setHometownErr("");
    setEmailErr("");
    setPhoneNumberErr("");
    setJobCategoryErr("");
    setJobTitleErr("");
    setStartDateErr("");

    const updatedProfile = {
      employeeCode: employeeCode,
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

    console.log(updatedProfile);
    axios
      .put(
        `http://localhost:5000/hrm/updateEmployee/${employeeCode}`,
        updatedProfile
      )
      .then((res) => {
        if (res.data.status === "Sucessful") {
          window.alert(res.data.message);
          props.setTriggerUser(false);
          window.location.reload();
        } else if (res.data.status === "Error") {
        }
      })
      .catch((err) => console.log(err));
  };

  return props.triggerUser ? (
    <div className="modal-container">
      <div className="modalbox-content">
        <div className="modal-title">
          Update Profile{" "}
          <i
            className="fa-solid fa-xmark exit-icon"
            onClick={() => props.setTriggerUser(false)}
          ></i>
        </div>
        <div className="modalbox-block">
          <form
            action=""
            className="addEmployee-form"
            style={{ padding: "0px", height: "450px" }}
          >
            <div
              className="input-group"
              style={{ height: "480px", width: "650px" }}
            >
              <div className="field-container">
                <label>
                  Employee code <span className="error">*</span>
                </label>
                <input
                  type="text"
                  name="employeeCode"
                  defaultValue={employeeCode}
                  style={{ width: "90%" }}
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
                  name="fullName"
                  defaultValue={props.employeeData.fullname}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ width: "90%" }}
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
                  name="dob"
                  defaultValue={formatDate(props.employeeData.dob)}
                  onChange={(e) => setDob(e.target.value)}
                  style={{ width: "90%" }}
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
                  name="gender"
                  defaultValue={props.employeeData.gender}
                  onChange={(e) => setGender(e.target.value)}
                  style={{ width: "90%" }}
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
                  name="hometown"
                  defaultValue={props.employeeData.hometown}
                  onChange={(e) => setHometown(e.target.value)}
                  style={{ width: "90%" }}
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
              style={{ height: "480px", width: "650px" }}
            >
              <div className="field-container">
                <label>
                  Email <span className="error">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={props.employeeData.email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: "90%" }}
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
                  name="phoneNumber"
                  defaultValue={props.employeeData.phonenumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{ width: "90%" }}
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
                  name="jobCategory"
                  defaultValue={props.employeeData.jobcategory}
                  onChange={(e) => setJobCategory(e.target.value)}
                  style={{ width: "90%" }}
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
                  name="jobtitle"
                  defaultValue={props.employeeData.jobtitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  style={{ width: "90%" }}
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
                  name="startDate"
                  defaultValue={formatDate(props.employeeData.startdate)}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{ width: "90%" }}
                />
                {startDateErr ? (
                  <div className="error">{startDateErr}</div>
                ) : (
                  <div className="error">&nbsp;</div>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="btn">
          <button
            className="add-btn"
            style={{ backgroundColor: "#253d90" }}
            onClick={() => {
              handleUpdate();
            }}
          >
            Update
          </button>
          <button
            className="add-btn"
            style={{ backgroundColor: "red" }}
            onClick={() => {
              props.setTriggerUser(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
