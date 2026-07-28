const mongoose = require('mongoose');

const studySessionSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true
  },
  duration: {
    type: Number,   // seconds
    required: true
  },
  startedAt: {
    type: Date,
    required: true
  },
  technique: {
    type: String,
    default: 'pomodoro'
  }
}, { timestamps: true });

module.exports = mongoose.model('StudySession', studySessionSchema);