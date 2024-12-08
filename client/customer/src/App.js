import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/Auth/Profile";
import AddProperty from "./components/Property/AddProperty";
import PropertyList from "./components/Property/PropertyList";
import TenantList from "./components/TenantOwner/TenantList";

import DocumentUpload from "./components/Document/DocumentUpload";
import Chatbot from "./components/Chatbot/Chatbot";
import Dashboard from "./components/Dashboard";
import axios from "axios";

import { UserProvider } from "./components/Auth/UserContext";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  const [properties, setProperties] = useState([]);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/properties"
        );
        setProperties(response.data); // Set the properties state with fetched data
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setUsername(username);
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
  };

  const addNewProperty = (newProperty) => {
    setProperties((prevProperties) => [...prevProperties, newProperty]);
  };

  return (
    <UserProvider>
      <Router>
        <div className="container">
          <h1>PROPERTY SALES AND RENTAL MANAGEMENT</h1>
          <nav>
            {!isAuthenticated ? (
              <ul>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/add-property">Add Property</Link>
                </li>
                <li>
                  <Link to="/properties">Properties</Link>
                </li>
                <li>
                  <Link to="/tenants">Tenants</Link>
                </li>
                <li>
                  <Link to="/owners">Owners</Link>
                </li>
                <li>
                  <Link to="/chatbot">Chatbot</Link>
                </li>
                <li>
                  <Link to="/" onClick={() => setIsAuthenticated(false)}>
                    Logout
                  </Link>
                </li>
              </ul>
            )}
          </nav>

          <Routes>
            {!isAuthenticated ? (
              <>
                <Route
                  path="/login"
                  element={<Login onLogin={handleLogin} />}
                />
                <Route
                  path="/register"
                  element={<Register onRegister={handleRegister} />}
                />
                <Route path="/" element={<Navigate to="/login" />} />
              </>
            ) : (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path="/profile"
                  element={<Profile username={username} />}
                />
                <Route
                  path="/add-property"
                  element={<AddProperty onAddProperty={addNewProperty} />}
                />
                <Route
                  path="/properties"
                  element={<PropertyList properties={properties} />}
                />
                <Route
                  path="/tenants"
                  element={<TenantList properties={properties} />}
                />

                <Route path="/upload-document" element={<DocumentUpload />} />
                <Route path="/chatbot" element={<Chatbot />} />
                <Route path="/" element={<Navigate to="/dashboard" />} />
              </>
            )}
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
