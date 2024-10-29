import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { useForm } from 'react-hook-form';
import axios from "axios";
import "./studentRegister.css";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    middleName: yup.string().required('Middle name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    dateOfBirth: yup.date().required('Date of birth is required').nullable(),
    phoneNumber: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
    gender: yup.string().oneOf(['male', 'female'], 'Gender is required').required('Gender is required'),
    address: yup.object().shape({
        street: yup.string(),
        city: yup.string(),
        country: yup.string(),
    }),
    emergencyContact: yup.object().shape({
        name: yup.string().required('Emergency contact name is required'),
        phoneNumber: yup.string().matches(/^[0-9]{10}$/, 'Emergency contact phone number must be 10 digits').required('Emergency contact phone number is required'),
        relationship: yup.string().required('Relationship is required'),
    }),
    courses: yup.array().min(1, 'At least one course must be selected'), 
});

const StudentRegistration = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });
    
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourses, setSelectedCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/course/");
                setCourses(response.data); 
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:5000/api/v1/student/", data);
            console.log("Data submitted successfully:", response.data);
        } catch (err) {
            console.error("Error submitting data:", err);
        }
    };

    if (loading) return <p>Loading courses...</p>;
    if (error) return <p>Error loading courses: {error.message}</p>;

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCourseSelect = (courseId) => {
        setSelectedCourses(prev => {
            const newSelectedCourses = prev.includes(courseId)
                ? prev.filter(id => id !== courseId)
                : [...prev, courseId];

            setValue('courses', newSelectedCourses);
            return newSelectedCourses;
        });
    };

    return (
        <motion.div className='register'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: 50 }}
            exit={{ opacity: 0 }}
        >
            <h2>Register Student</h2>
            <div className="form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <h3>Student Information</h3>
                        <div className='one'>
                            <div>
                                <input placeholder='First Name' {...register('firstName')} />
                                {errors.firstName && <p className="error">{errors.firstName.message}</p>}
                            </div>
                            <div>
                                <input placeholder='Middle Name' {...register('middleName')} />
                                {errors.middleName && <p className="error">{errors.middleName.message}</p>}
                            </div>
                            <div>
                                <input placeholder='Last Name' {...register('lastName')} />
                                {errors.lastName && <p className="error">{errors.lastName.message}</p>}
                            </div>
                        </div>
                        <div className='one'>
                            <div>
                                <input placeholder='Email' type="email" {...register('email')} />
                                {errors.email && <p className="error">{errors.email.message}</p>}
                            </div>
                            <div>
                                <input placeholder='Phone Number' {...register('phoneNumber')} />
                                {errors.phoneNumber && <p className="error">{errors.phoneNumber.message}</p>}
                            </div>
                            <div>
                            <select {...register('gender')}>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            {errors.gender && <p className="error">{errors.gender.message}</p>}
                        </div>
                            <div>
                                <input placeholder='Birth Date' type="date" {...register('dateOfBirth')} />
                                {errors.dateOfBirth && <p className="error">{errors.dateOfBirth.message}</p>}
                            </div>
                        </div>
                        
                        <div>
                            <h3>Address</h3>
                            <input placeholder='Street Address' {...register('address.street')} />
                            <input placeholder='City' {...register('address.city')} />
                            <input placeholder='Country' {...register('address.country')} />
                        </div>
                        <div>
                            <h3>Emergency Contact</h3>
                            <input placeholder='Name' {...register('emergencyContact.name')} />
                            {errors.emergencyContact?.name && <p className="error">{errors.emergencyContact.name.message}</p>}
                            <input placeholder='Phone Number' {...register('emergencyContact.phoneNumber')} />
                            {errors.emergencyContact?.phoneNumber && <p className="error">{errors.emergencyContact.phoneNumber.message}</p>}
                            <input placeholder='Relation' {...register('emergencyContact.relationship')} />
                            {errors.emergencyContact?.relationship && <p className="error">{errors.emergencyContact.relationship.message}</p>}
                        </div>
                        <div>
                            <h3>Courses</h3>
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="course-dropdown" style={{ maxHeight: '150px', overflowY: 'scroll', border: '1px solid #ccc', borderRadius: '4px', padding: '5px' }}>
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
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default StudentRegistration;