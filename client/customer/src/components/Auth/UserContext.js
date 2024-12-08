import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

// Create UserContext
const UserContext = createContext();

// UserProvider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Example user state
    const [loading, setLoading] = useState(true); // Loading state to check if the user is authenticated
    const [error, setError] = useState(null); // For storing any error messages

    // Check local storage for JWT token on initial load
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            // Optionally, you can verify the token via API call here
            setUser({ token });  // Simplified for this example, store token as user data
        }
        setLoading(false);
    }, []);

    // Handle user registration
    const registerUser = async (email, password) => {
        try {
            const response = await axios.post('/api/register', { email, password });
            const { token, user } = response.data;
            localStorage.setItem('jwtToken', token);
            setUser(user); // Save user information in state
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    // Handle user login
    const loginUser = async (email, password) => {
        try {
            const response = await axios.post('/api/login', { email, password });
            const { token, user } = response.data;
            localStorage.setItem('jwtToken', token);
            setUser(user); // Save user information in state
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    // Handle Google login
    const googleLogin = async (response) => {
        try {
            const googleToken = response.credential;
            const apiResponse = await axios.post('/api/google-login', { token: googleToken });
            const { token, user } = apiResponse.data;
            localStorage.setItem('jwtToken', token);
            setUser(user); // Save user information in state
        } catch (err) {
            setError('Google login failed. Please try again.');
        }
    };

    // Handle logout
    const logoutUser = () => {
        localStorage.removeItem('jwtToken');
        setUser(null); // Clear user state
    };

    return (
        <UserContext.Provider value={{ user, loading, error, registerUser, loginUser, googleLogin, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use user context
export const useUser = () => {
    return useContext(UserContext);
};

export default UserContext; // Export UserContext
