import React, { useState, useEffect } from "react";
import "./homepage.css";
import { Sidebar } from "../../components/Sidebar/sidebar";
import { Searchbar } from "../../components/Searchbar/searchbar";
import axios from "axios";
import Cookies from "js-cookie";
import { UpdateModal } from "../../components/UpdateModal/updateModal";
import { formatDate } from "../../utils/formatDate";

export const Homepage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [userData, setUserData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/hrm/search?name=${searchName}`)
      .then((res) => {
        if (res.data.status === "Sucessful") {
          setEmployees(res.data.data);
          setDataLoaded(true);
          console.log(searchName);
        } else if (res.data.status === "Error") {
          setEmployees([]);
        }
      })
      .then((err) => console.log(err));
  }, [searchName]);

  useEffect(() => {
    let storedUserData = Cookies.get("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleDelete = (employeeCode) => {
    axios
      .put(`http://localhost:5000/hrm/deleteEmployee/${employeeCode}`)
      .then((res) => {
        window.alert("Delete sucessfully");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="homepage-content">
      <Sidebar data={userData} dataLoaded={dataLoaded} />
      <div className="statistical-content">
        <Searchbar setSearchName={setSearchName} />
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Employee Code</th>
              <th>Fullname</th>
              <th>Date of birth</th>
              <th>Gender</th>
              <th>Hometown</th>
              <th>Start date</th>
              <th>Job title</th>
              <th>Job category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td style={{ textAlign: "left" }}>{employee.employeecode}</td>
                <td style={{ textAlign: "left" }}>{employee.fullname}</td>
                <td>{formatDate(employee.dob)}</td>
                <td style={{ textAlign: "left" }}>{employee.gender}</td>
                <td style={{ textAlign: "left" }}>{employee.hometown}</td>
                <td>{formatDate(employee.startdate)}</td>
                <td style={{ textAlign: "left" }}>{employee.jobtitle}</td>
                <td style={{ textAlign: "left" }}>{employee.jobcategory}</td>
                <td>
                  <i
                    className="fa-regular fa-pen-to-square icon"
                    style={{ color: "#0f2b8f", cursor: "pointer" }}
                    onClick={() => setSelectedEmployee(employee)}
                  ></i>
                  <i
                    className="fa-regular fa-trash-can"
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDelete(employee.employeecode)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedEmployee && (
          <UpdateModal
            triggerUser={true}
            setTriggerUser={setSelectedEmployee}
            value="Update Profile"
            employeeData={selectedEmployee}
          />
        )}
      </div>
    </div>
  );
};
