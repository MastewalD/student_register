const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.post("/", studentController.createStudent);

router.get('/courses/stats', studentController.getCourseStats);

router.get("/", studentController.getAllStudents);

router.get("/student/:id", studentController.getStudentById);

router.put("/:id", studentController.updateStudent);

router.delete("/deleteStudent/:id", studentController.deleteStudent);

router.get('/stats', studentController.getStudentStats);

router.get('/search', studentController.searchStudents);

module.exports = router;