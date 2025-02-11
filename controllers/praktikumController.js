const { Praktikum, Kelompok, Pertemuan } = require('../models');

// Create new praktikum
const createPraktikum = async (req, res) => {
  try {
    const { 
      nama_praktikum, 
      periode,
      tanggal_mulai,
      tanggal_selesai,
      deskripsi,
      link_form 
    } = req.body;

    const praktikum = await Praktikum.create({
      nama_praktikum,
      periode,
      tanggal_mulai,
      tanggal_selesai,
      deskripsi,
      link_form,
      status: 'aktif'
    });
    res.status(201).json(praktikum);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all praktikum
const getAllPraktikum = async (req, res) => {
  try {
    const praktikums = await Praktikum.findAll({
      include: [
        {
          model: Kelompok,
          attributes: ['id', 'nama_kelompok']
        },
        {
          model: Pertemuan,
          attributes: ['id', 'nama_pertemuan', 'urutan', 'tanggal', 'status']
        }
      ],
      order: [
        ['periode', 'DESC'],
        ['tanggal_mulai', 'DESC'],
        [Pertemuan, 'urutan', 'ASC']
      ]
    });
    res.json(praktikums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get praktikum by ID
const getPraktikumById = async (req, res) => {
  try {
    const praktikum = await Praktikum.findByPk(req.params.id, {
      include: [
        {
          model: Kelompok,
          attributes: ['id', 'nama_kelompok']
        },
        {
          model: Pertemuan,
          attributes: ['id', 'nama_pertemuan', 'urutan', 'tanggal', 'status']
        }
      ],
      order: [
        [Pertemuan, 'urutan', 'ASC']
      ]
    });
    if (!praktikum) {
      return res.status(404).json({ error: 'Praktikum not found' });
    }
    res.json(praktikum);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update praktikum
const updatePraktikum = async (req, res) => {
  try {
    const { 
      nama_praktikum,
      periode,
      tanggal_mulai,
      tanggal_selesai,
      deskripsi,
      link_form,
      status 
    } = req.body;

    const praktikum = await Praktikum.findByPk(req.params.id);
    
    if (!praktikum) {
      return res.status(404).json({ error: 'Praktikum not found' });
    }

    await praktikum.update({
      nama_praktikum,
      periode,
      tanggal_mulai,
      tanggal_selesai,
      deskripsi,
      link_form,
      status
    });

    res.json(praktikum);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete praktikum
const deletePraktikum = async (req, res) => {
  try {
    const praktikum = await Praktikum.findByPk(req.params.id);
    
    if (!praktikum) {
      return res.status(404).json({ error: 'Praktikum not found' });
    }

    // Check if there are any pertemuan records
    const pertemuanCount = await Pertemuan.count({
      where: { id_praktikum: req.params.id }
    });

    if (pertemuanCount > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete praktikum with existing pertemuan records' 
      });
    }

    await praktikum.destroy();
    res.json({ message: 'Praktikum deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get active praktikum
const getActivePraktikum = async (req, res) => {
  try {
    const praktikums = await Praktikum.findAll({
      where: { status: 'aktif' },
      include: [
        {
          model: Pertemuan,
          attributes: ['id', 'nama_pertemuan', 'urutan', 'tanggal', 'status']
        }
      ],
      order: [
        ['periode', 'DESC'],
        ['tanggal_mulai', 'DESC'],
        [Pertemuan, 'urutan', 'ASC']
      ]
    });
    res.json(praktikums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPraktikum,
  getAllPraktikum,
  getPraktikumById,
  updatePraktikum,
  deletePraktikum,
  getActivePraktikum
};