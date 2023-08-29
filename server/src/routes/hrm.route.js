const express = require("express");
const hrmController = require("../controllers/hrm.controller");

const router = express.Router();

// CRUD
router.post("/addNewEmployee", hrmController.addNewEmployee);
router.get("/getAllEmployees", hrmController.getAllEmployees);
router.put("/updateEmployee/:employeeCode", hrmController.updateEmployee);
router.put("/deleteEmployee/:employeeCode", hrmController.deleteEmployee);

// Search
router.get("/search", hrmController.searchEmployee);

// Filter
router.get("/getByHometown/:hometown", hrmController.getByHometown);
router.get("/getByJobCategory/:jobCategory", hrmController.getByJobCategory);
router.get("/getByJobTitle/:jobTitle", hrmController.getByJobTitle);

// Pagnition
router.get("/employeePagnition", hrmController.employeePagnition);
module.exports = router;
