// src/UserProfile.js
import React from 'react';
import { useUser } from './UserContext'; // Import the UserContext

const UserProfile = () => {
    const { user } = useUser(); // Get user data from context

    if (!user) {
        return <div>Please log in to see your profile.</div>; // Show a message if user is not logged in
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p>Username: {user.username}</p>
            <h3>Purchased Properties</h3>
            {user.purchasedProperties.length === 0 ? (
                <p>No properties purchased yet.</p>
            ) : (
                <ul>
                    {user.purchasedProperties.map((property, index) => (
                        <li key={index}>
                            {property.title} - ${property.price}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserProfile;
