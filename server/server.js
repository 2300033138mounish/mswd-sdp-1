const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const Property = require("./models/Property"); // Property model

const app = express();
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/properties", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Serve static files in the "uploads" folder
app.use("/uploads", express.static("uploads"));

// Property POST route
app.post("/api/properties", upload.single("image"), async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const newProperty = new Property({
      title,
      description,
      price,
      imageUrl: `/uploads/${req.file.filename}`,
    });

    await newProperty.save();
    res.status(201).json({ message: "Property added successfully", property: newProperty });
  } catch (error) {
    res.status(500).json({ message: "Error adding property", error });
  }
});

// Start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
