const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");
const upload = require("../middlewares/uploadMiddleware");

// Route to add a new property with image upload
router.post("/add", upload.single("image"), propertyController.addProperty);

// Route to get all properties
router.get("/", propertyController.getProperties);

module.exports = router;
