const Student = require("../models/studentModel"); 
const Course = require("../models/courseModel")


exports.createStudent = async (req, res) => {
    try {
        // Create a new student
        const student = new Student(req.body);
        await student.save();

        // Update each course with the new student's ID
        if (student.courses && student.courses.length > 0) {
            await Course.updateMany(
                { _id: { $in: student.courses } },
                { $addToSet: { students: student._id } } // Use $addToSet to avoid duplicates
            );
        }

        // Return the created student
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.enrollStudentInCourse = async (studentId, courseId) => {
    try {
        await Student.findByIdAndUpdate(studentId, {
            $addToSet: { courses: courseId } 
        });

        await Course.findByIdAndUpdate(courseId, {
            $addToSet: { students: studentId } 
        });
    } catch (error) {
        console.error(error);
        throw new Error('Error enrolling student in course');
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getStudentStats = async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        const maleStudents = await Student.countDocuments({ gender: 'male' });
        const femaleStudents = await Student.countDocuments({ gender: 'female' });

        res.status(200).json({
            totalStudents,
            maleStudents,
            femaleStudents,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getCourseStats = async (req, res) => {
    try {
        const courses = await Course.find().populate('students'); 
        const courseStats = courses.map(course => ({
            label: course.title, 
            count: course.students.length,
        }));
        
        res.status(200).json(courseStats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};