require('dotenv').config();
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const Property = require('./models/Property');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadsDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
        }
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);

app.post('/api/properties/upload', upload.single('image'), async (req, res) => {
    try {
        const { title, description, price } = req.body;
        if (!title || !description || !price || !req.file) {
            return res.status(400).json({ message: 'All fields (title, description, price, image) are required' });
        }

        const newProperty = new Property({
            title,
            description,
            price,
            imageUrl: `/uploads/${req.file.filename}`,
        });

        await newProperty.save();

        res.status(201).json({
            message: 'Property added successfully',
            property: newProperty,
        });
    } catch (error) {
        console.error('Error uploading property:', error);
        res.status(500).json({ message: 'Error adding property', error });
    }
});

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
    console.error("Error: MONGODB_URI is not defined in your environment variables.");
    process.exit(1);
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
