const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// GET user favorites
router.get('/', auth, async (req, res) => {
  try {
    // req.user is populated by the auth middleware
    const user = await User.findById(req.user.id).populate('favorites');
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST toggle favorite
router.post('/', auth, async (req, res) => {
  try {
    const { propertyId } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isFavorite = user.favorites.includes(propertyId);
    
    if (isFavorite) {
      // Remove from favorites
      user.favorites = user.favorites.filter(id => id.toString() !== propertyId);
    } else {
      // Add to favorites
      user.favorites.push(propertyId);
    }
    
    await user.save();
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
