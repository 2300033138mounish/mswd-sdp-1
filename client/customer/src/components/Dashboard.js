// Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <nav>
                <ul>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/add-property">Add Property</Link></li>
                    <li><Link to="/properties">Property List</Link></li>
                    <li><Link to="/tenants">Tenant List</Link></li>
                    <li><Link to="/owners">Owner List</Link></li>
                    <li><Link to="/chatbot">Chatbot</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Dashboard;
