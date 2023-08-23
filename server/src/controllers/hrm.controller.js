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

    console.log(req.body);

    const existedEmployee = await db.query(
      "SELECT * FROM employees WHERE employeeCode = $1",
      [employeeCode]
    );
    if (existedEmployee.rows.length === 0) {
      return res.status(400).json({ message: "Not Found Employee" });
    }

    let updateFields = [];
    let updateValues = [employeeCode];

    if (fullName !== null) {
      updateFields.push("fullName = $2");
      updateValues.push(fullName);
    }
    if (dob !== null) {
      updateFields.push("dob = $3::date");
      updateValues.push(dob);
    }
    if (gender !== null) {
      updateFields.push("gender = $4");
      updateValues.push(gender);
    }
    if (hometown !== null) {
      updateFields.push("hometown = $5");
      updateValues.push(hometown);
    }
    if (email !== null) {
      updateFields.push("email = $6");
      updateValues.push(email);
    }
    if (phoneNumber !== null) {
      updateFields.push("phoneNumber = $7");
      updateValues.push(phoneNumber);
    }
    if (jobCategory !== null) {
      updateFields.push("jobCategory = $8");
      updateValues.push(jobCategory);
    }
    if (jobTitle !== null) {
      updateFields.push("jobTitle = $9");
      updateValues.push(jobTitle);
    }
    if (startDate !== null) {
      updateFields.push("startDate = $10::date");
      updateValues.push(startDate);
    }

    if (updateFields.length > 0) {
      const updateQuery = [
        "UPDATE employees SET",
        updateFields.join(", "),
        "WHERE employeeCode = $1",
      ].join(" ");

      db.query(updateQuery, updateValues);
    }
    res.send({
      status: "Sucessful",
      message: "Update employee successfully",
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
