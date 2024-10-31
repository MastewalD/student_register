import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { FiSearch } from 'react-icons/fi'; // Importing the search icon
import "./studentsList.css";

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const studentsPerPage = 5;

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/student');
                if (!response.ok) {
                    throw new Error('Failed to fetch students');
                }
                const data = await response.json();
                setStudents(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const filteredStudents = students.filter(student => {
        const fullName = `${student.firstName} ${student.middleName} ${student.lastName}`.toLowerCase();
        const email = student.email.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase()) || email.includes(searchQuery.toLowerCase());
    });

    const startIndex = currentPage * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;
    const currentStudents = filteredStudents.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

    const nextPage = () => {
        if ((currentPage + 1) * studentsPerPage < filteredStudents.length) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(0); // Reset to the first page on a new search
    };

    const calculateAge = (dateOfBirth) => {
        const dob = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDifference = today.getMonth() - dob.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <div>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className='studentList'
            >
                <div className="searchContainer">
                    <input 
                        type="text" 
                        placeholder="Search by name or email..." 
                        value={searchQuery} 
                        onChange={handleSearchChange} 
                    />
                    <FiSearch className="searchIcon" />
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Address</th>
                            <th>Emergency Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentStudents.map(student => (
                            <tr key={student._id}>
                                <td>{student.firstName}</td>
                                <td>{student.middleName}</td>
                                <td>{student.lastName}</td>
                                <td>{student.email}</td>
                                <td>{calculateAge(student.dateOfBirth)}</td>
                                <td>{student.gender}</td>
                                <td>{`${student.address.street}, ${student.address.city}, ${student.address.country}`}</td>
                                <td>{`${student.emergencyContact.name}, ${student.emergencyContact.phoneNumber}, ${student.emergencyContact.relationship}`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className='buttons'>
                    <button onClick={prevPage} disabled={currentPage === 0}>Previous</button>
                    <button onClick={nextPage} disabled={(currentPage + 1) * studentsPerPage >= filteredStudents.length}>Next</button>
                </div>
            </motion.div>
        </div>
    );
};

export default StudentList;