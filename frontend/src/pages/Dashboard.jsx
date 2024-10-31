import React, { useEffect, useState } from 'react';
import { FaUserFriends, FaMale, FaFemale } from 'react-icons/fa'; 
import Card from '../components/Card.jsx';
import "./Dashboard.css";
import BarChart from '../components/chart/BarChart.jsx';

const Dashboard = () => {
    const [studentStats, setStudentStats] = useState({
        totalStudents: 0,
        maleStudents: 0,
        femaleStudents: 0,
    });
    const [courseStats, setCourseStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchStudentStats = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/student/stats');
                if (!response.ok) {
                    throw new Error('Failed to fetch student statistics');
                }
                const data = await response.json();
                setStudentStats(data);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchCourseStats = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/student/courses/stats');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch course statistics');
                }
                const data = await response.json();
                console.log(data)
                setCourseStats(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchStudentStats();
        fetchCourseStats();
        
        setLoading(false);
    }, []);

    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const cardsData = [
        {
            title: 'Total Students',
            icon: FaUserFriends,
            amount: studentStats.totalStudents,
        },
        {
            title: 'Total Male Students',
            icon: FaMale,
            amount: studentStats.maleStudents,
        },
        {
            title: 'Total Female Students',
            icon: FaFemale,
            amount: studentStats.femaleStudents,
        },
    ];
  
    return (
        <div className="dashboard">
            <div className="cards-container">
                {cardsData.map((card, index) => (
                    <Card key={index} title={card.title} icon={card.icon} amount={card.amount} />
                ))}
            </div>
            <BarChart data={courseStats} /> 
            
        </div>
    );
};

export default Dashboard;