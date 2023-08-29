import React, { useState, useEffect } from "react";
import "./homepage.css";
import { Sidebar } from "../../components/Sidebar/sidebar";
import { Searchbar } from "../../components/Searchbar/searchbar";
import axios from "axios";
import Cookies from "js-cookie";
import { UpdateModal } from "../../components/UpdateModal/updateModal";
import { formatDate } from "../../utils/formatDate";
import { Select, Options } from "../../components/Select/select";

export const Homepage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [userData, setUserData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [searchName, setSearchName] = useState("");

  const [typeSelection, setTypeSelection] = useState("All employees");

  const hometowns = [
    "Select...",
    "Ha Noi",
    "Thai Binh",
    "Nam Dinh",
    "Hai Phong",
  ];
  const jobCategories = [
    "Select...",
    "Full-time",
    "Part-time",
    "Intern",
    "Remote",
  ];
  const jobTitles = ["Select...", "Dev", "Tester", "BrSE", "PM", "HR"];

  useEffect(() => {
    if (typeSelection === "All employees") {
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
    }
  }, [searchName, typeSelection]);

  useEffect(() => {
    let storedUserData = Cookies.get("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  // functions handle
  const handleDelete = (employeeCode) => {
    axios
      .put(`http://localhost:5000/hrm/deleteEmployee/${employeeCode}`)
      .then((res) => {
        window.alert("Delete sucessfully");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  // const handleFilter = (selectedValue) => {
  //   if (typeSelection === "All employees") {
  //     axios
  //       .get(`http://localhost:5000/hrm/search?name=${searchName}`)
  //       .then((res) => {
  //         if (res.data.status === "Sucessful") {
  //           setEmployees(res.data.data);
  //           setDataLoaded(true);
  //           console.log(searchName);
  //         } else if (res.data.status === "Error") {
  //           setEmployees([]);
  //         }
  //       })
  //       .then((err) => console.log(err));
  //   } else if (typeSelection === "Hometown") {
  //     fetchByHometown();
  //   } else if (typeSelection === "Job category") {
  //     fetchByJobCategory();
  //   } else if (typeSelection === "Job title") {
  //     fetchByJobTitle();
  //   }
  // };

  // filter functions
  const fetchByHometown = (hometown) => {
    axios
      .get(`http://localhost:5000/hrm/getByHometown/${hometown}`)
      .then((res) => {
        if (res.data.status === "Sucessful") {
          setEmployees(res.data.data);
        } else if (res.data.status === "Error") {
          setEmployees([]);
        }
      })
      .catch((error) => console.log(error));
  };
  const fetchByJobCategory = (jobCategory) => {
    axios
      .get(`http://localhost:5000/hrm/getByJobCategory/${jobCategory}`)
      .then((res) => {
        if (res.data.status === "Sucessful") {
          setEmployees(res.data.data);
        } else if (res.data.status === "Error") {
          setEmployees([]);
        }
      })
      .catch((error) => console.log(error));
  };
  const fetchByJobTitle = (jobTitle) => {
    axios
      .get(`http://localhost:5000/hrm/getByHometown/${jobTitle}`)
      .then((res) => {
        if (res.data.status === "Sucessful") {
          setEmployees(res.data.data);
        } else if (res.data.status === "Error") {
          setEmployees([]);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="homepage-content">
      <Sidebar data={userData} dataLoaded={dataLoaded} />
      <div className="statistical-content">
        <div className="header">
          <Searchbar setSearchName={setSearchName} />
          <div className="filter">
            <Select label="Filtering: " setValue={setTypeSelection}>
              <Options value="All employees" />
              <Options value="Hometown" />
              <Options value="Job category" />
              <Options value="Job title" />
            </Select>
            {typeSelection === "Hometown" ? (
              <>
                <Select label="" setValue={fetchByHometown}>
                  {hometowns.map((item, index) => {
                    return <Options key={index} value={item}></Options>;
                  })}
                </Select>
              </>
            ) : typeSelection === "Job category" ? (
              <>
                <Select label="" setValue={fetchByJobCategory}>
                  {jobCategories.map((item, index) => {
                    return <Options key={index} value={item}></Options>;
                  })}
                </Select>
              </>
            ) : typeSelection === "Job title" ? (
              <>
                <Select label="" setValue={fetchByJobTitle}>
                  {jobTitles.map((item, index) => {
                    return <Options key={index} value={item}></Options>;
                  })}
                </Select>
              </>
            ) : null}
          </div>
        </div>
        <div className="table-wrapper">
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
    </div>
  );
};
