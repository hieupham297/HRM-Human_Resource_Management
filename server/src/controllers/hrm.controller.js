const db = require("../database/db");

// Thêm, sửa, xóa data
const getAllEmployees = async (req, res) => {
  try {
    const employeeList = await db.query(
      "SELECT * FROM employees WHERE isactive = true"
    );
    res.send({ status: "Sucessful", data: employeeList.rows });
  } catch (error) {
    console.log(error);
    res.send({ status: "Error" });
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
      "INSERT INTO employees (employeeCode, fullName, dob, gender, hometown, email, phoneNumber, jobCategory, jobTitle, startDate, isActive) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, true)",
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
      return res.json({
        status: "Error",
        message: "Employee not found",
      });
    }

    db.query("UPDATE employees SET isActive = false WHERE employeeCode = $1", [
      employeeCode,
    ]);
    return res
      .status(200)
      .json({ status: "Sucessful", message: "Delete employee successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: error, message: "Internal Server Error" });
  }
};

// API tìm kiếm
const searchEmployee = async (req, res) => {
  try {
    const { name } = req.query;

    const result = await db.query(
      "SELECT * FROM employees WHERE isactive = true AND fullname ILIKE $1",
      [`%${name}%`]
    );

    if (result.rows.length > 0) {
      res.send({ status: "Sucessful", data: result.rows });
    } else {
      res.send({ status: "Error", message: "Employee not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// API filter
const getByHometown = async (req, res) => {
  const { hometown } = req.params;
  try {
    const employeeList = await db.query(
      "SELECT * FROM employees WHERE isactive = true AND hometown = $1",
      [hometown]
    );
    res.send({ status: "Sucessful", data: employeeList.rows });
  } catch (error) {
    console.log(error);
    res.send({ status: "Error", message: error });
  }
};
const getByJobCategory = async (req, res) => {
  const { jobCategory } = req.params;
  try {
    const employeeList = await db.query(
      "SELECT * FROM employees WHERE isactive = true AND jobcategory = $1",
      [jobCategory]
    );
    res.send({ status: "Sucessful", data: employeeList.rows });
  } catch (error) {
    console.log(error);
    res.send({ status: "Error", message: error });
  }
};
const getByJobTitle = async (req, res) => {
  const { jobTitle } = req.params;
  try {
    const employeeList = await db.query(
      "SELECT * FROM employees WHERE isactive = true AND jobtitle = $1",
      [jobTitle]
    );
    res.send({ status: "Sucessful", data: employeeList.rows });
  } catch (error) {
    console.log(error);
    res.send({ status: "Error", message: error });
  }
};

// API pagnition
const employeePagnition = async (req, res) => {
  try {
    const page = parseInt(req.query) || 1; // nếu không có giá trị, mặc định page = 1
    const PAGE_SIZE = 10;

    const offset = (page - 1) * PAGE_SIZE;

    const employeeList = await db.query(
      "SELECT * FROM employees WHERE isactive = true LIMIT $1 OFFSET $2",
      [PAGE_SIZE, offset]
    );

    const allEmployees = await db.query(
      "SELECT COUNT(*) FROM employees WHERE isactive = true"
    );
    const total_pages = Math.ceil(allEmployees.rows[0].count / PAGE_SIZE);
    res.send({
      stastus: "Sucessful",
      data: employeeList.rows,
      total_pages,
      currentPage: page,
      totalEmployees: allEmployees.rows[0].count,
    });
  } catch (error) {
    console.log(error);
    res.send({ status: "Error", message: "Failed to load data" });
  }
};

module.exports = {
  getAllEmployees,
  addNewEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployee,
  getByHometown,
  getByJobCategory,
  getByJobTitle,
  employeePagnition,
};
