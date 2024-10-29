const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['female','male'],
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    phoneNumber: {
        type: String,
        match: /^[0-9]{10}$/, 
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    emergencyContact: {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            match: /^[0-9]{10}$/,
            required: true,
        },
        relationship: {
            type: String,
            required: true,
        }
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }]
},{timestamps:true});


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;