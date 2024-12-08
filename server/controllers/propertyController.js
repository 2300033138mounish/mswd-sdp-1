const Property = require("../models/Property");

// Add a new property
exports.addProperty = async (req, res) => {
  try {
    const { title, description, price, location } = req.body;

    // Check if an image file is uploaded
    const imagePath = req.file ? req.file.path : null;

    const newProperty = new Property({
      title,
      description,
      price,
      location,
      image: imagePath,
    });

    await newProperty.save();
    res.status(201).json({ message: "Property added successfully", property: newProperty });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all properties
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
