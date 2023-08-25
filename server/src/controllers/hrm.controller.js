const db = require("../database/db");

const getAllEmployees = async (req, res) => {
  try {
    const employeeList = await db.query("SELECT * FROM employees");
    res.send({ status: "Sucessful", data: employeeList.rows });
  } catch (error) {
    console.log(error);
    res.send({ status: "Failed" });
  }
};
const addNewEmployee = async (req, res) => {
  try {
    const {
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
    } = req.body;

    const existedEmployee = await db.query(
      "SELECT * FROM employees WHERE employeecode = $1",
      [employeeCode]
    );
    if (existedEmployee.rows.length > 0) {
      return res.status(400).json({ message: "Employee already existed" });
    }

    db.query(
      "INSERT INTO employees (employeeCode, fullName, dob, gender, hometown, email, phoneNumber, jobCategory, jobTitle, startDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [
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
      ]
    );
    res.send({
      status: "Sucessful",
      message: "Add a new employee successfully",
    });
  } catch (error) {
    console.log(error);
    res.send({ status: "Failed to add a new employee." });
  }
};
const updateEmployee = async (req, res) => {
  try {
    const { employeeCode } = req.params;
    const {
      fullName,
      dob,
      gender,
      hometown,
      email,
      phoneNumber,
      jobCategory,
      jobTitle,
      startDate,
    } = req.body;

    const existedEmployee = await db.query(
      "SELECT * FROM employees WHERE employeeCode = $1",
      [employeeCode]
    );
    if (existedEmployee.rows.length === 0) {
      return res.json({ status: "Error", message: "Not Found Employee" });
    }

    await db.query(
      "UPDATE employees SET employeecode = $1, fullname = $2, dob = $3, gender = $4, hometown = $5 ,email = $6, phonenumber = $7, jobcategory = $8, jobtitle = $9, startdate = $10 WHERE employeeCode = $1",
      [
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
      ]
    );
    res.send({
      status: "Sucessful",
      message: "Update profile successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: error, message: "Internal Server Error" });
  }
};
const deleteEmployee = async (req, res) => {
  try {
    const { employeeCode } = req.params;

    const existedEmployee = await db.query(
      "SELECT * FROM employees WHERE employeeCode = $1",
      [employeeCode]
    );
    if (existedEmployee.rows.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "Employee not found",
      });
    }

    db.query("DELETE FROM employees WHERE employeeCode = $1", [employeeCode]);
    return res
      .status(200)
      .json({ status: "Sucessfully", message: "Delete employee successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: error, message: "Internal Server Error" });
  }
};

module.exports = {
  getAllEmployees,
  addNewEmployee,
  updateEmployee,
  deleteEmployee,
};
