const db = require('../config/database');

// Create a new kelompok
const createKelompok = async (req, res) => {
  const { nama_kelompok, id_praktikum, anggota_ids } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO kelompok (nama_kelompok, id_praktikum) VALUES ($1, $2) RETURNING id',
      [nama_kelompok, id_praktikum]
    );
    
    const kelompokId = result.rows[0].id;
    
    // Add members to kelompok
    for (const userId of anggota_ids) {
      await db.query(
        'INSERT INTO anggota_kelompok (id_kelompok, id_user) VALUES ($1, $2)',
        [kelompokId, userId]
      );
    }
    
    res.status(201).json({ message: 'Kelompok created successfully', id: kelompokId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a kelompok
const updateKelompok = async (req, res) => {
  const { id } = req.params;
  const { nama_kelompok, anggota_ids } = req.body;
  try {
    await db.query(
      'UPDATE kelompok SET nama_kelompok = $1 WHERE id = $2',
      [nama_kelompok, id]
    );
    
    // Remove existing members
    await db.query('DELETE FROM anggota_kelompok WHERE id_kelompok = $1', [id]);
    
    // Add new members
    for (const userId of anggota_ids) {
      await db.query(
        'INSERT INTO anggota_kelompok (id_kelompok, id_user) VALUES ($1, $2)',
        [id, userId]
      );
    }
    
    res.json({ message: 'Kelompok updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a kelompok
const deleteKelompok = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM anggota_kelompok WHERE id_kelompok = $1', [id]);
    await db.query('DELETE FROM kelompok WHERE id = $1', [id]);
    res.json({ message: 'Kelompok deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get kelompok by praktikum
const getKelompokByPraktikum = async (req, res) => {
  const { praktikumId } = req.params;
  try {
    const result = await db.query(
      `SELECT k.*, 
        json_agg(json_build_object(
          'id', u.id,
          'nama', u.nama,
          'email', u.email
        )) as anggota
      FROM kelompok k
      LEFT JOIN anggota_kelompok ak ON k.id = ak.id_kelompok
      LEFT JOIN users u ON ak.id_user = u.id
      WHERE k.id_praktikum = $1
      GROUP BY k.id`,
      [praktikumId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get kelompok by user
const getKelompokByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await db.query(
      `SELECT k.*, 
        json_agg(json_build_object(
          'id', u.id,
          'nama', u.nama,
          'email', u.email
        )) as anggota
      FROM kelompok k
      LEFT JOIN anggota_kelompok ak ON k.id = ak.id_kelompok
      LEFT JOIN users u ON ak.id_user = u.id
      WHERE EXISTS (
        SELECT 1 FROM anggota_kelompok
        WHERE id_kelompok = k.id AND id_user = $1
      )
      GROUP BY k.id`,
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get kelompok by ID
const getKelompokById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      `SELECT k.*, 
        json_agg(json_build_object(
          'id', u.id,
          'nama', u.nama,
          'email', u.email
        )) as anggota
      FROM kelompok k
      LEFT JOIN anggota_kelompok ak ON k.id = ak.id_kelompok
      LEFT JOIN users u ON ak.id_user = u.id
      WHERE k.id = $1
      GROUP BY k.id`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Kelompok not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createKelompok,
  updateKelompok,
  deleteKelompok,
  getKelompokByPraktikum,
  getKelompokByUser,
  getKelompokById
}; 