import React from "react";
import { useUser } from "./UserContext"; // Import the UserContext
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useUser(); // Get user data from context
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate("/tenants"); // Navigate to TenantList component
  };

  if (!user) {
    return <div>Please log in to see your profile.</div>; // Show a message if user is not logged in
  }

  return (
    <div style={styles.profileContainer}>
      <div style={styles.userInfo}>
        <img
          src="path_to_user_icon.png" // Replace with actual icon path
          alt="User  Icon"
          style={styles.userIcon}
        />
        <h2>{user.username}</h2> {/* Display the username */}
      </div>
      <h3>Purchased Properties</h3>
      {user.purchasedProperties.length === 0 ? (
        <p>No properties purchased yet.</p>
      ) : (
        <ul>
          {user.purchasedProperties.map((property, index) => (
            <li key={index}>
              {property.title} - ${property.price} <br />
              Location: {property.location} {/* Displaying the location */}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleBookClick} style={styles.bookButton}>
        Book
      </button>
    </div>
  );
};

// Styles
const styles = {
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  userIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  bookButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Profile;
