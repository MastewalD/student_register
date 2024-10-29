import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import "./studentsList.css";

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);
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
        const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
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

    const handleShowDetails = (student) => {
        setSelectedStudent(student);
    };

    const handleCloseDetails = () => {
        setSelectedStudent(null);
        setIsEditing(false); 
    };

    const handleEditStudent = () => {
        setIsEditing(true);
    };

  ;

    const handleDeleteStudent = async (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            try {
                
                await fetch(`http://localhost:5000/api/v1/student/${id}`, {
                    method: 'DELETE',
                });
                
                
                setStudents(students.filter(student => student._id !== id));
            } catch (err) {
                console.error('Failed to delete student:', err);
            }
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
        >
            <h2>Registered Students</h2>

           
            <input 
                type="text" 
                placeholder="Search by name..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
            />

           
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentStudents.map(student => (
                        <tr key={student._id}>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.email}</td>
                            <td>
                                <button onClick={() => handleShowDetails(student)}>View Details</button>
                                <button onClick={handleEditStudent}>Edit</button>
                                <button onClick={() => handleDeleteStudent(student._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='buttons'>
                <button onClick={prevPage} disabled={currentPage === 0}>Previous</button>
                <button onClick={nextPage} disabled={(currentPage + 1) * studentsPerPage >= filteredStudents.length}>Next</button>
            </div>

        </motion.div>
    );
};

export default StudentList;