// BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data = { labels: [], datasets: [] } }) => {
   
    if (!data || !Array.isArray(data)) {
        console.error("Invalid data provided to BarChart", data);
        return <div>No data available</div>; 
    }

    
    const chartData = {
        labels: data.map(course => course.label), 
        datasets: [
            {
                label: 'Number of Students',
                data: data.map(course => course.count),
                backgroundColor: '#A9D4D9',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

   
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Course Registration Statistics',
            },
        },
    };

    return (
        <div>
            <Bar data={chartData} options={options}  width={300} height={100}/>
        </div>
    );
};


BarChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
        })
    ).isRequired,
};



export default BarChart;