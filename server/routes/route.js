const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Patient = require('../models/patient');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// POST /api/register
router.post('/register', async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      address,
      dob,
      complaint
    } = req.body;

    // Optional: basic validation
    if (!name || !phone || !email || !address || !complaint) {
      return res.status(400).json({ message: 'Name, contact no, email, address and complaints are required' });
    }

    // Check for existing patient by email
    const existing = await Patient.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Patient with this email already exists' });
    }

    // Create and save new patient
    const patient = new Patient({
      name,
      phone,
      email,
      address,
      dob,
      complaint
    });

    await patient.save();

    res.status(201).json({ message: 'Patient registered successfully', patient });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// POST /api/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({
      success: true,
      token,
      user: { username: user.username, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// GET /api/patients
router.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find(); // fetch all patients from DB
    res.status(200).json(patients);        // send as JSON
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// POST /api/logout
router.post('/logout', (req, res) => {
  // On frontend, remove token from localStorage/cookie
  res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;
