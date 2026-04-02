const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const auth = require('../middleware/auth'); // optional: protect create/update/delete

// GET all properties
router.get('/', async (req, res) => {
  try {
    let query = {};
    if (req.query.location) query.location = new RegExp(req.query.location, 'i');
    if (req.query.maxPrice) query.price = { $lte: Number(req.query.maxPrice) };

    const properties = await Property.find(query);
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single property
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new property
router.post('/', async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update property
router.put('/:id', async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE property
router.delete('/:id', async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
