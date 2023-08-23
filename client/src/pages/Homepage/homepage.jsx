import React, { useState, useEffect } from "react";
import "./homepage.css";
import { Sidebar } from "../../components/Sidebar/sidebar";
import { Searchbar } from "../../components/Searchbar/searchbar";
import axios from "axios";
import Cookies from "js-cookie";
import { UpdateModal } from "../../components/UpdateModal/updateModal";
import { formatDate } from "../../utils/utils";

export const Homepage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [userData, setUserData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/hrm/getAllEmployees")
      .then((res) => {
        setEmployees(res.data.data);
        setDataLoaded(true);
      })
      .then((err) => console.log(err));
  }, []);

  useEffect(() => {
    let storedUserData = Cookies.get("userData");
    console.log(storedUserData, JSON.parse(storedUserData));
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleDelete = (employeeCode) => {
    axios
      .delete(`http://localhost:5000/hrm/deleteEmployee/${employeeCode}`)
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
        <Searchbar />
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
              <tr key={employee.id}>
                <td>{index + 1}</td>
                <td>{employee.employeecode}</td>
                <td>{employee.fullname}</td>
                <td>{formatDate(employee.dob)}</td>
                <td>{employee.gender}</td>
                <td>{employee.hometown}</td>
                <td>{formatDate(employee.startdate)}</td>
                <td>{employee.jobtitle}</td>
                <td>{employee.jobcategory}</td>
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
