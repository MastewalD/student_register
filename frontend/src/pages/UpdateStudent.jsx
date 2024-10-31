import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiSearch } from 'react-icons/fi';
import SuccessUpdate from '../components/SuccessUpdate'; 
import SuccessDelete from '../components/SuccessDelet'; 
import "./UpdateStudent.css";

const schema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    middleName: yup.string().required('Middle name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    dateOfBirth: yup.date().required('Date of birth is required').nullable(),
    phoneNumber: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
    gender: yup.string().oneOf(['male', 'female'], 'Gender is required').required('Gender is required'),
    address: yup.object().shape({
        street: yup.string().required('Street is required'),
        city: yup.string().required('City is required'),
        country: yup.string().required('Country is required'),
    }),
    emergencyContact: yup.object().shape({
        name: yup.string().required('Emergency contact name is required'),
        phoneNumber: yup.string().matches(/^[0-9]{10}$/, 'Emergency contact phone number must be 10 digits').required('Emergency contact phone number is required'),
        relationship: yup.string().required('Relationship is required'),
    }),
    courses: yup.array().min(1, 'At least one course must be selected'), 
});

const UpdateStudent = () => {
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [courseSearchTerm, setCourseSearchTerm] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [successUpdate, setSuccessUpdate] = useState(false);
    const [successDelete, setSuccessDelete] = useState(false);
    const [serverError, setServerError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/course/");
                setCourses(response.data); 
                setFilteredCourses(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCourses();
    }, []);

    const handleSearch = async (query) => {
        if (!query) {
            setStudents([]);
            return;
        }
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/student/search?query=${query}`);
            setStudents(response.data);
        } catch (err) {
            console.error("Error fetching students:", err);
        }
    };

    const handleStudentSelect = (student) => {
        setSelectedStudent(student);
        setValue('firstName', student.firstName);
        setValue('middleName', student.middleName);
        setValue('lastName', student.lastName);
        setValue('email', student.email);
        setValue('phoneNumber', student.phoneNumber);
        setValue('gender', student.gender);
        setValue('dateOfBirth', student.dateOfBirth.split('T')[0]);
        setValue('address.street', student.address.street);
        setValue('address.city', student.address.city);
        setValue('address.country', student.address.country);
        setValue('emergencyContact.name', student.emergencyContact.name);
        setValue('emergencyContact.phoneNumber', student.emergencyContact.phoneNumber);
        setValue('emergencyContact.relationship', student.emergencyContact.relationship);
        setValue('courses', student.courses);

        setSearchTerm('');
        setStudents([]);
        setSelectedCourses(student.courses);
    };

    const handleCourseSearch = (query) => {
        if (!query) {
            setFilteredCourses(courses);
        } else {
            const filtered = courses.filter(course =>
                course.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredCourses(filtered);
        }
    };

    const handleCourseSelect = (courseId) => {
        setSelectedCourses(prevSelected => {
            if (prevSelected.includes(courseId)) {
                return prevSelected.filter(id => id !== courseId);
            } else {
                return [...prevSelected, courseId];
            }
        });
    };

    const onSubmit = async (data) => {
        const formData = {
            ...data,
            courses: selectedCourses,
        };
        try {
            await axios.put(`http://localhost:5000/api/v1/student/${selectedStudent._id}`, formData);
            setSuccessUpdate(true);
            setServerError(null);
            reset(); 
            setSelectedStudent(null);
            setSelectedCourses([]); 
        } catch (err) {
            console.error("Error updating student:", err);
            if (err.response && err.response.data) {
                setServerError(err.response.data.message);
            } else {
                setServerError("An unexpected error occurred.");
            }
        }
    };

    const handleDelete = async (studentId) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/student/deleteStudent/${studentId}`);
            setSuccessDelete(true);
            setStudents(students.filter(student => student._id !== studentId));
        } catch (err) {
            console.error("Error deleting student:", err);
            setServerError("Failed to delete student.");
        }
    };

    if (successUpdate) {
        return <SuccessUpdate />; 
    }

    if (successDelete) {
        return <SuccessDelete />; 
    }

    return (
        <motion.div className='update'>
            
            <div className="searchContainer">
         
            <input
                    className='search'
                    type="text"
                    placeholder="Search student by name or email..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        handleSearch(e.target.value);
                    }}
                />
                <FiSearch className="searchIcon" />

           

            </div>


            {students.length > 0 && (
                <ul className="studentList">
                    {students.map(student => (
                        <li key={student._id} className="studentItem">
                            {student.firstName} {student.lastName} - {student.email}
                            <div className='updateDelete'>
                            <button onClick={() => handleStudentSelect(student)}>Update</button>
                            <button className='delete' onClick={() => handleDelete(student._id)}>Delete</button>

                            </div>
                            
                        </li>
                    ))}
                </ul>
            )}

            {selectedStudent && (
                <form className="RegisterForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="cards">
                        <div className='RegiCard'>
                            <h3>Student Information</h3>
                            <div className='input-group'>
                                <input placeholder='First Name' {...register('firstName')} />
                                {errors.firstName && <p className="error">{errors.firstName.message}</p>}
                                <input placeholder='Middle Name' {...register('middleName')} />
                                {errors.middleName && <p className="error">{errors.middleName.message}</p>}
                                <input placeholder='Last Name' {...register('lastName')} />
                                {errors.lastName && <p className="error">{errors.lastName.message}</p>}
                                <input placeholder='Email' type="email" {...register('email')} />
                                {errors.email && <p className="error">{errors.email.message}</p>}
                                <input placeholder='Phone Number' {...register('phoneNumber')} />
                                {errors.phoneNumber && <p className="error">{errors.phoneNumber.message}</p>}
                                <select {...register('gender')}>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                {errors.gender && <p className="error">{errors.gender.message}</p>}
                                <input placeholder='Birth Date' type="date" {...register('dateOfBirth')} />
                                {errors.dateOfBirth && <p className="error">{errors.dateOfBirth.message}</p>}
                            </div>
                        </div>

                        <div className="RegiCard">
                            <h3>Address</h3>
                            <div className='input-group'>
                                <input placeholder='Street Address' {...register('address.street')} />
                                {errors.address?.street && <p className="error">{errors.address.street.message}</p>}
                                <input placeholder='City' {...register('address.city')} />
                                {errors.address?.city && <p className="error">{errors.address.city.message}</p>}
                                <input placeholder='Country' {...register('address.country')} />
                                {errors.address?.country && <p className="error">{errors.address.country.message}</p>}
                            </div>

                            <h3>Emergency Contact</h3>
                            <div className='input-group'>
                                <input placeholder='Name' {...register('emergencyContact.name')} />
                                {errors.emergencyContact?.name && <p className="error">{errors.emergencyContact.name.message}</p>}
                                <input placeholder='Phone Number' {...register('emergencyContact.phoneNumber')} />
                                {errors.emergencyContact?.phoneNumber && <p className="error">{errors.emergencyContact.phoneNumber.message}</p>}
                                <input placeholder='Relation' {...register('emergencyContact.relationship')} />
                                {errors.emergencyContact?.relationship && <p className="error">{errors.emergencyContact.relationship.message}</p>}
                            </div>
                        </div>

                        <div className='RegiCard'>
                            <h3>Courses</h3>
                            <input
                                type="text"
                                placeholder="Search courses by title..."
                                value={courseSearchTerm}
                                onChange={(e) => {
                                    setCourseSearchTerm(e.target.value);
                                    handleCourseSearch(e.target.value);
                                }}
                            />
                            <div className="course-dropdown">
                                {filteredCourses.map(course => (
                                    <div key={course._id} className="course-option">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={selectedCourses.includes(course._id)}
                                                onChange={() => handleCourseSelect(course._id)}
                                            />
                                            {course.title}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.courses && <p className="error">{errors.courses.message}</p>}
                        </div>
                    </div>
                    {serverError && <p className="error">{serverError}</p>}
                    <button className="registerButton" type="submit">Update</button>
                </form>
            )}
        </motion.div>
    );
};

export default UpdateStudent;