import React from 'react';

const Card = ({ title, icon: Icon, amount }) => {
    return (
        <div className="dashboardCard">
            <div className="card-icon">
                <Icon size={40} />
            </div>
            <div className="card-content">
                <h3>{title}</h3>
                <p>${amount}</p>
            </div>
        </div>
    );
};

export default Card;