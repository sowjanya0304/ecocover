const express = require('express');
const Pickup = require('../models/Pickup');
const Report = require('../models/Report');

const router = express.Router();

// request pickup
router.post('/', async (req, res) => {
  try {
    const { reportId, scheduledAt } = req.body;
    const report = await Report.findById(reportId);
    if (!report) return res.status(400).json({ message: 'Invalid report' });
    const pickup = new Pickup({ report: report._id, scheduledAt });
    report.status = 'Assigned';
    await report.save();
    await pickup.save();
    res.json(pickup);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// collector updates status
router.put('/:id/status', async (req, res) => {
  try {
    const { status, collectorId } = req.body;
    const pickup = await Pickup.findById(req.params.id);
    if (!pickup) return res.status(404).json({ message: 'Not found' });
    pickup.status = status;
    if (collectorId) pickup.collector = collectorId;
    await pickup.save();
    if (status === 'Completed') {
      const report = await Report.findById(pickup.report);
      report.status = 'Completed';
      await report.save();
    }
    res.json(pickup);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// list pickups
router.get('/', async (req, res) => {
  try {
    const pickups = await Pickup.find().populate('report').populate('collector');
    res.json(pickups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
