const express = require('express');
const User = require('../models/User');
const Report = require('../models/Report');
const Pickup = require('../models/Pickup');

const router = express.Router();

// list users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// assign pickup to collector
router.post('/assign', async (req, res) => {
  try {
    const { pickupId, collectorId } = req.body;
    const pickup = await Pickup.findById(pickupId);
    if (!pickup) return res.status(404).json({ message: 'Pickup not found' });
    pickup.collector = collectorId;
    pickup.status = 'In Progress';
    await pickup.save();
    res.json(pickup);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// stats
router.get('/stats', async (req, res) => {
  try {
    const totalReports = await Report.countDocuments();
    const totalPickups = await Pickup.countDocuments({ status: 'Completed' });
    const pointsDistributed = await User.aggregate([{ $group: { _id: null, total: { $sum: '$points' } } }]);
    res.json({ totalReports, totalPickups, pointsDistributed: pointsDistributed[0] ? pointsDistributed[0].total : 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
