import React from "react";

const TenantList = ({ properties }) => {
  return (
    <div>
      <h2>Tenant Property Listings</h2>
      <div style={styles.propertyContainer}>
        {properties.map((property) => (
          <div key={property.id} style={styles.propertyCard}>
            <img
              src={`http://localhost:5000${property.imageUrl}`}
              alt={property.title}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
            <h3>{property.title}</h3>
            <p>{property.description}</p>
            <p>Price: ₹{property.price.toLocaleString()}</p>{" "}
            {/* Change price to INR */}
            {/* Display location */}
            <div style={styles.buttonContainer}>
              <button style={styles.buyButton}>Buy</button>
              <button style={styles.rentButton}>Book for Rent</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles
const styles = {
  propertyContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  propertyCard: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    margin: "10px",
    width: "30%",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  propertyImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  buyButton: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  rentButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default TenantList;
