const express = require("express");
const hrmController = require("../controllers/hrm.controller");

const router = express.Router();

router.post("/addNewEmployee", hrmController.addNewEmployee);
router.get("/getAllEmployees", hrmController.getAllEmployees);
router.put("/updateEmployee/:employeeCode", hrmController.updateEmployee);
router.put("/deleteEmployee/:employeeCode", hrmController.deleteEmployee);

module.exports = router;
