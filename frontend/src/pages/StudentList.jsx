import React, { useEffect, useState } from 'react';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/students'); 
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

    return (
        <div>
            <h2>Registered Students</h2>
            <ul>
                {students.map(student => (
                    <li key={student.id}>
                        {student.firstName} {student.lastName} - {student.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;