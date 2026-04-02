const express = require('express');
const multer = require('multer');
const path = require('path');
const Report = require('../models/Report');
const User = require('../models/User');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Create report with image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { userId, lat, lng, address, reportedType } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: 'Invalid user' });
    // Placeholder AI logic: classify based on reportedType or filename
    let detectedType = reportedType || 'Unknown';
    if (req.file && req.file.originalname.toLowerCase().includes('plastic')) detectedType = 'Plastic';

    const report = new Report({
      user: user._id,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      location: { type: 'Point', coordinates: [parseFloat(lng) || 0, parseFloat(lat) || 0] },
      address,
      detectedType,
      reportedType,
    });
    await report.save();

    // add points to user
    user.points += 10;
    await user.save();

    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// List reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().populate('user');
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
