const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
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
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        zip: {
            type: String,
        },
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
        },
    },
},{timestamps:true});


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;