import React from "react";

const PropertyList = ({ properties }) => {
  // Check if properties is an array before attempting to map
  if (!Array.isArray(properties) || properties.length === 0) {
    return <div>No properties available.</div>;
  }

  return (
    <div>
      <h2>Property List</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {properties.map((property) => (
          <div
            key={property.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "200px",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ fontSize: "1.2rem", margin: "0 0 10px" }}>
              {property.title}
            </h3>
            <p style={{ margin: "0 0 10px" }}>{property.description}</p>
            <p style={{ margin: "0 0 10px" }}>
              Price: ₹{property.price.toLocaleString()}
            </p>

            <img
              src={`http://localhost:5000${property.imageUrl}`}
              alt={`Image of ${property.title}`}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
              onError={(e) => {
                e.target.onerror = null; // Prevents looping
                e.target.src = "path/to/default/image.jpg"; // Fallback image
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
