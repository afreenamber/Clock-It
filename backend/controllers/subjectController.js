const Subject = require('../models/Subject');

const PALETTE = ['#C9A24B', '#4FA98C', '#8C5A4B', '#6E8FB0', '#A6789A'];

exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: 1 });
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createSubject = async (req, res) => {
  try {
    const { name } = req.body;
    const count = await Subject.countDocuments();
    const color = PALETTE[count % PALETTE.length];
    const subject = await Subject.create({ name, color });
    res.status(201).json(subject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};