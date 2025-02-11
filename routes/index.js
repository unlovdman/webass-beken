const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const praktikumRoutes = require('./praktikumRoutes');
const asistensiRoutes = require('./asistensiRoutes');
const laporanRoutes = require('./laporanRoutes');
const nilaiRoutes = require('./nilaiRoutes');
const pertemuanRoutes = require('./pertemuanRoutes');

// Mount routes
router.use('/api/users', userRoutes);
router.use('/api/praktikum', praktikumRoutes);
router.use('/api/asistensi', asistensiRoutes);
router.use('/api/laporan', laporanRoutes);
router.use('/api/nilai', nilaiRoutes);
router.use('/api/pertemuan', pertemuanRoutes);

module.exports = router; 