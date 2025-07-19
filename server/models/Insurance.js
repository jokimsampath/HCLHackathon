// models/HealthPolicy.js

const mongoose = require('mongoose');

const HealthPolicySchema = new mongoose.Schema({
  policyId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // or String if you're storing userId as plain string
    ref: 'User',
    required: true
  },
  policyName: {
    type: String,
    required: true
  },
  policyNumber: {
    type: String,
    required: true,
    unique: true
  },
  sumInsured: {
    type: Number,
    required: true
  },
  premiumAmount: {
    type: Number,
    required: true
  },
  tenure: {
    type: Number, // In years
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  addOnCovers: {
    type: [String], // Array of selected add-on covers
    default: []
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

module.exports = mongoose.model('HealthPolicy', HealthPolicySchema);
