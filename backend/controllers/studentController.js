const Student = require("../models/studentModel"); 
const Course = require("../models/courseModel")

exports.createStudent = async (req, res) => {
    try {
       
        const existingStudent = await Student.findOne({ email: req.body.email });
        if (existingStudent) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        if (!req.body.courses || req.body.courses.length === 0) {
            return res.status(400).json({ message: 'At least one course must be provided.' });
        }

        const student = new Student(req.body);
        await student.save();

        await Course.updateMany(
            { _id: { $in: student.courses } },
            { $addToSet: { students: student._id } }
        );

        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
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
        
        const existingStudent = await Student.findOne({
            email: req.body.email,
            _id: { $ne: req.params.id }
        });

        if (existingStudent) {
            return res.status(400).json({ message: "Email already exists" });
        }

        
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

exports.searchStudents = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: 'Query parameter is required.' });
    }

    try {
        const students = await Student.find({
            $or: [
                { firstName: { $regex: query, $options: 'i' } },
                { middleName: { $regex: query, $options: 'i' } },
                { lastName: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        });

        return res.json(students);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

