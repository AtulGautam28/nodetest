// routes/imageRoutes.js

const express = require('express');
const router = express.Router();
const imageController = require('../controller/imageController');
const upload = require('../config/multer');

// Upload an image
router.post('/upload', upload.single('file'), imageController.uploadImage);

// Retrieve an image by ID
router.get('/:id', imageController.getImage);

module.exports = router;
