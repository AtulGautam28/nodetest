// controllers/imageController.js

const Image = require('../model/Image');
const upload = require('../config/multer');
const BASE_URL = 'http://localhost:3000';

exports.uploadImage = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = `${BASE_URL}/${req.file.path}`; 

    const image = new Image({ title, description, imageUrl });
    await image.save();

    res.status(201).json({ message: 'Image uploaded successfully', image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading image' });
  }
};

exports.getImage = async (req, res) => {
  try {
    const imageId = req.params.id;
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving image' });
  }
};
