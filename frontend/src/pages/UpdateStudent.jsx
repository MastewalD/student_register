// UpdateStudent.jsx
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import "./studentRegister.css";


const schema = yup.object().shape({
  
});

const UpdateStudent = ({ student, onClose }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);

    useEffect(() => {
       
        setValue('firstName', student.firstName);
        setValue('middleName', student.middleName);
        setValue('lastName', student.lastName);
        setValue('email', student.email);
        setValue('phoneNumber', student.phoneNumber);
        setValue('gender', student.gender);
        setValue('dateOfBirth', student.dateOfBirth);
        setValue('address.street', student.address.street);
        setValue('address.city', student.address.city);
        setValue('address.country', student.address.country);
        setValue('emergencyContact.name', student.emergencyContact.name);
        setValue('emergencyContact.phoneNumber', student.emergencyContact.phoneNumber);
        setValue('emergencyContact.relationship', student.emergencyContact.relationship);
        setSelectedCourses(student.courses);

       
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
    }, [student, setValue]);

    const onSubmit = async (data) => {
        try {
            await axios.put(`http://localhost:5000/api/v1/student/${student._id}`, { ...data, courses: selectedCourses });
            onClose();
        } catch (err) {
            console.error("Error updating data:", err);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data: {error}</p>;

   
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            
            <button type="submit">Update</button>
        </form>
    );
};

export default UpdateStudent;