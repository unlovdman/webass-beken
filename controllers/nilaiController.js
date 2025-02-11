const { Nilai, User, Praktikum } = require('../models');

// Create or update nilai
const updateNilai = async (req, res) => {
  try {
    const { id_user, id_praktikum, nilai_praktikum, nilai_asistensi, nilai_laporan } = req.body;
    
    // Find or create nilai record
    const [nilai, created] = await Nilai.findOrCreate({
      where: { id_user, id_praktikum },
      defaults: {
        nilai_praktikum,
        nilai_asistensi,
        nilai_laporan
      }
    });

    if (!created) {
      await nilai.update({
        nilai_praktikum,
        nilai_asistensi,
        nilai_laporan
      });
    }

    res.json(nilai);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all nilai
const getAllNilai = async (req, res) => {
  try {
    const nilai = await Nilai.findAll({
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
    res.json(nilai);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get nilai by user ID
const getNilaiByUser = async (req, res) => {
  try {
    const nilai = await Nilai.findAll({
      where: { id_user: req.params.userId },
      include: [
        {
          model: Praktikum,
          attributes: ['id', 'nama_praktikum']
        }
      ]
    });
    res.json(nilai);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get nilai by praktikum ID
const getNilaiByPraktikum = async (req, res) => {
  try {
    const nilai = await Nilai.findAll({
      where: { id_praktikum: req.params.praktikumId },
      include: [
        {
          model: User,
          attributes: ['id', 'nama', 'email']
        }
      ]
    });
    res.json(nilai);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get nilai summary for a user
const getNilaiSummary = async (req, res) => {
  try {
    const nilai = await Nilai.findAll({
      where: { id_user: req.params.userId },
      include: [
        {
          model: Praktikum,
          attributes: ['nama_praktikum']
        }
      ],
      attributes: [
        'nilai_praktikum',
        'nilai_asistensi',
        'nilai_laporan',
        'nilai_akhir'
      ]
    });

    // Calculate average scores
    const summary = {
      nilai: nilai,
      rata_rata: {
        praktikum: 0,
        asistensi: 0,
        laporan: 0,
        akhir: 0
      }
    };

    if (nilai.length > 0) {
      summary.rata_rata = {
        praktikum: nilai.reduce((acc, n) => acc + (n.nilai_praktikum || 0), 0) / nilai.length,
        asistensi: nilai.reduce((acc, n) => acc + (n.nilai_asistensi || 0), 0) / nilai.length,
        laporan: nilai.reduce((acc, n) => acc + (n.nilai_laporan || 0), 0) / nilai.length,
        akhir: nilai.reduce((acc, n) => acc + (n.nilai_akhir || 0), 0) / nilai.length
      };
    }

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  updateNilai,
  getAllNilai,
  getNilaiByUser,
  getNilaiByPraktikum,
  getNilaiSummary
}; 