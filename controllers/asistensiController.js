const { Asistensi, User, Praktikum } = require('../models');

// Create new asistensi record
const createAsistensi = async (req, res) => {
  try {
    const { id_user, id_praktikum, kehadiran, nilai_asistensi } = req.body;
    
    // Check if user and praktikum exist
    const user = await User.findByPk(id_user);
    const praktikum = await Praktikum.findByPk(id_praktikum);
    
    if (!user || !praktikum) {
      return res.status(404).json({ error: 'User or Praktikum not found' });
    }

    const asistensi = await Asistensi.create({
      id_user,
      id_praktikum,
      kehadiran,
      nilai_asistensi
    });

    res.status(201).json(asistensi);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all asistensi records
const getAllAsistensi = async (req, res) => {
  try {
    const asistensi = await Asistensi.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'nama', 'email']
        },
        {
          model: Praktikum,
          attributes: ['id', 'nama_praktikum', 'tanggal']
        }
      ]
    });
    res.json(asistensi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get asistensi by praktikum ID
const getAsistensiByPraktikum = async (req, res) => {
  try {
    const asistensi = await Asistensi.findAll({
      where: { id_praktikum: req.params.praktikumId },
      include: [
        {
          model: User,
          attributes: ['id', 'nama', 'email']
        }
      ]
    });
    res.json(asistensi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get asistensi by user ID
const getAsistensiByUser = async (req, res) => {
  try {
    const asistensi = await Asistensi.findAll({
      where: { id_user: req.params.userId },
      include: [
        {
          model: Praktikum,
          attributes: ['id', 'nama_praktikum', 'tanggal']
        }
      ]
    });
    res.json(asistensi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update asistensi
const updateAsistensi = async (req, res) => {
  try {
    const { kehadiran, nilai_asistensi } = req.body;
    const asistensi = await Asistensi.findOne({
      where: {
        id_user: req.params.userId,
        id_praktikum: req.params.praktikumId
      }
    });
    
    if (!asistensi) {
      return res.status(404).json({ error: 'Asistensi record not found' });
    }

    await asistensi.update({
      kehadiran,
      nilai_asistensi
    });

    res.json(asistensi);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createAsistensi,
  getAllAsistensi,
  getAsistensiByPraktikum,
  getAsistensiByUser,
  updateAsistensi
}; 