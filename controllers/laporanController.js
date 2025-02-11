const { Laporan, User, Praktikum } = require('../models');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/laporan');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      return cb(null, true);
    }
    cb('Error: Only PDF and Word documents are allowed!');
  }
}).single('file_laporan');

// Upload laporan
const uploadLaporan = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }

    try {
      const { id_praktikum } = req.body;
      const id_user = req.user.id; // Get user ID from auth middleware

      const laporan = await Laporan.create({
        id_user,
        id_praktikum,
        file_laporan: req.file.path
      });

      res.status(201).json(laporan);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};

// Get all laporan
const getAllLaporan = async (req, res) => {
  try {
    const laporan = await Laporan.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'nama', 'email']
        },
        {
          model: Praktikum,
          attributes: ['id', 'nama_praktikum']
        }
      ]
    });
    res.json(laporan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get laporan by user ID
const getLaporanByUser = async (req, res) => {
  try {
    const laporan = await Laporan.findAll({
      where: { id_user: req.params.userId },
      include: [
        {
          model: Praktikum,
          attributes: ['id', 'nama_praktikum']
        }
      ]
    });
    res.json(laporan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get laporan by praktikum ID
const getLaporanByPraktikum = async (req, res) => {
  try {
    const laporan = await Laporan.findAll({
      where: { id_praktikum: req.params.praktikumId },
      include: [
        {
          model: User,
          attributes: ['id', 'nama', 'email']
        }
      ]
    });
    res.json(laporan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update nilai laporan
const updateNilaiLaporan = async (req, res) => {
  try {
    const { nilai_laporan } = req.body;
    const laporan = await Laporan.findOne({
      where: {
        id_user: req.params.userId,
        id_praktikum: req.params.praktikumId
      }
    });
    
    if (!laporan) {
      return res.status(404).json({ error: 'Laporan not found' });
    }

    await laporan.update({ nilai_laporan });
    res.json(laporan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  uploadLaporan,
  getAllLaporan,
  getLaporanByUser,
  getLaporanByPraktikum,
  updateNilaiLaporan
}; 