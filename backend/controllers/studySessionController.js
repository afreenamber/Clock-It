const StudySession = require('../models/StudySession');

exports.createSession = async (req, res) => {
  try {
    const { courseName, duration, startedAt, technique } = req.body;
    const session = await StudySession.create({ courseName, duration, startedAt, technique });
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSessions = async (req, res) => {
  try {
    const sessions = await StudySession.find().sort({ startedAt: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};