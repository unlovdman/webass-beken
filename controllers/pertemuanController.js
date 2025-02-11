const { Pertemuan, Praktikum, Asistensi } = require('../models');

// Create new pertemuan
const createPertemuan = async (req, res) => {
  try {
    const { 
      id_praktikum, 
      nama_pertemuan, 
      urutan, 
      tanggal, 
      deskripsi, 
      materi 
    } = req.body;

    // Check if praktikum exists
    const praktikum = await Praktikum.findByPk(id_praktikum);
    if (!praktikum) {
      return res.status(404).json({ error: 'Praktikum not found' });
    }

    // Check if urutan is already taken for this praktikum
    const existingPertemuan = await Pertemuan.findOne({
      where: { id_praktikum, urutan }
    });
    if (existingPertemuan) {
      return res.status(400).json({ error: 'Urutan pertemuan already exists for this praktikum' });
    }

    const pertemuan = await Pertemuan.create({
      id_praktikum,
      nama_pertemuan,
      urutan,
      tanggal,
      deskripsi,
      materi,
      status: 'belum_mulai'
    });

    res.status(201).json(pertemuan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all pertemuan for a praktikum
const getPertemuanByPraktikum = async (req, res) => {
  try {
    const pertemuan = await Pertemuan.findAll({
      where: { id_praktikum: req.params.praktikumId },
      order: [['urutan', 'ASC']],
      include: [{
        model: Praktikum,
        attributes: ['nama_praktikum', 'periode']
      }]
    });
    res.json(pertemuan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get pertemuan by ID
const getPertemuanById = async (req, res) => {
  try {
    const pertemuan = await Pertemuan.findByPk(req.params.id, {
      include: [{
        model: Praktikum,
        attributes: ['nama_praktikum', 'periode']
      }]
    });
    if (!pertemuan) {
      return res.status(404).json({ error: 'Pertemuan not found' });
    }
    res.json(pertemuan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update pertemuan
const updatePertemuan = async (req, res) => {
  try {
    const { 
      nama_pertemuan, 
      urutan, 
      tanggal, 
      deskripsi, 
      materi, 
      status 
    } = req.body;

    const pertemuan = await Pertemuan.findByPk(req.params.id);
    if (!pertemuan) {
      return res.status(404).json({ error: 'Pertemuan not found' });
    }

    // If urutan is being changed, check if new urutan is available
    if (urutan && urutan !== pertemuan.urutan) {
      const existingPertemuan = await Pertemuan.findOne({
        where: { 
          id_praktikum: pertemuan.id_praktikum, 
          urutan 
        }
      });
      if (existingPertemuan) {
        return res.status(400).json({ error: 'Urutan pertemuan already exists for this praktikum' });
      }
    }

    await pertemuan.update({
      nama_pertemuan,
      urutan,
      tanggal,
      deskripsi,
      materi,
      status
    });

    res.json(pertemuan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete pertemuan
const deletePertemuan = async (req, res) => {
  try {
    const pertemuan = await Pertemuan.findByPk(req.params.id);
    if (!pertemuan) {
      return res.status(404).json({ error: 'Pertemuan not found' });
    }

    // Check if there are any asistensi records for this pertemuan
    const asistensiCount = await Asistensi.count({
      where: { id_pertemuan: req.params.id }
    });

    if (asistensiCount > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete pertemuan with existing asistensi records' 
      });
    }

    await pertemuan.destroy();
    res.json({ message: 'Pertemuan deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPertemuan,
  getPertemuanByPraktikum,
  getPertemuanById,
  updatePertemuan,
  deletePertemuan
}; 