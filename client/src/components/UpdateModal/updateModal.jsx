import React, { useState } from "react";
import "./updateModal.css";
import { formatDate } from "../../utils/utils";
import axios from "axios";

export const UpdateModal = (props) => {
  const [employeeCode, setEmployeeCode] = useState(
    props.employeeData.employeecode
  );
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [hometown, setHometown] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [startDate, setStartDate] = useState("");

  const handleUpdate = () => {
    const updatedProfile = {
      fullName,
      dob: dob !== "" ? dob : null,
      gender,
      hometown,
      email,
      phoneNumber,
      jobCategory,
      jobTitle,
      startDate: startDate !== "" ? startDate : null,
    };

    console.log(updatedProfile);
    axios
      .put(
        `http://localhost:5000/hrm/updateEmployee/${employeeCode}`,
        validateData(updatedProfile)
      )
      .then((res) => {
        if (res.data.status === "Sucessful") {
          window.alert(res.data.message);
          props.setTriggerUser(false);
          window.location.reload();
        } else {
          console.log("Failed");
        }
      })
      .catch((err) => console.log(err));
  };
  const validateData = (data) => {
    let validatedData = {};
    for (const i in data) {
      if (data[i] !== null && data[i] !== undefined && data[i] !== "") {
        validatedData[i] = data[i];
      }
    }
    return validatedData;
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
          <table className="editable-table">
            <tr>
              <th>Employee Code</th>
              <td>
                <input
                  className="editable-input"
                  type="text"
                  name="employeeCode"
                  value={props.employeeData.employeecode}
                />
              </td>
            </tr>
            <tr>
              <th>Full Name</th>
              <td>
                <input
                  className="editable-input"
                  type="text"
                  name="fullName"
                  defaultValue={props.employeeData.fullname}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>Date Of Birth</th>
              <td>
                <input
                  className="editable-input"
                  type="date"
                  name="dob"
                  defaultValue={formatDate(props.employeeData.dob)}
                  onChange={(e) => setDob(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>
                <input
                  className="editable-input"
                  type="text"
                  name="dob"
                  defaultValue={props.employeeData.gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>Hometown</th>
              <td>
                <input
                  className="editable-input"
                  type="text"
                  name="hometown"
                  defaultValue={props.employeeData.hometown}
                  onChange={(e) => setHometown(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>Email address</th>
              <td>
                <input
                  className="editable-input"
                  type="text"
                  name="hometown"
                  defaultValue={props.employeeData.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>Phone number</th>
              <td>
                <input
                  className="editable-input"
                  type="text"
                  name="hometown"
                  defaultValue={props.employeeData.phonenumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>Job category</th>
              <td>
                <input
                  className="editable-input"
                  type="text"
                  name="jobCategory"
                  defaultValue={props.employeeData.jobcategory}
                  onChange={(e) => setJobCategory(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>Job title</th>
              <td>
                <input
                  className="editable-input"
                  type="text"
                  name="jobCategory"
                  defaultValue={props.employeeData.jobtitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>Start date</th>
              <td>
                <input
                  className="editable-input"
                  type="date"
                  name="startDate"
                  defaultValue={formatDate(props.employeeData.startdate)}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </td>
            </tr>
          </table>
        </div>
        <div className="btn">
          <button
            className="add-btn"
            style={{ backgroundColor: "blue" }}
            onClick={handleUpdate}
          >
            Update
          </button>
          <button className="add-btn" style={{ backgroundColor: "red" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
