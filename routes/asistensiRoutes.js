const express = require('express');
const router = express.Router();
const {
  createAsistensi,
  getAllAsistensi,
  getAsistensiByPraktikum,
  getAsistensiByUser,
  updateAsistensi
} = require('../controllers/asistensiController');
const { auth, checkRole } = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Asistensi:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         id_user:
 *           type: integer
 *         id_praktikum:
 *           type: integer
 *         id_pertemuan:
 *           type: integer
 *         kehadiran:
 *           type: boolean
 *         nilai_asistensi:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 100
 *         catatan:
 *           type: string
 *         waktu_mulai:
 *           type: string
 *           format: date-time
 *         waktu_selesai:
 *           type: string
 *           format: date-time
 */

// All routes require authentication
router.use(auth);

/**
 * @swagger
 * /api/asistensi:
 *   post:
 *     summary: Create a new asistensi record
 *     tags: [Asistensi]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Asistensi'
 *     responses:
 *       201:
 *         description: Asistensi record created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 */
router.post('/', checkRole(['admin', 'asisten_lab']), createAsistensi);

/**
 * @swagger
 * /api/asistensi/{userId}/{praktikumId}:
 *   put:
 *     summary: Update an asistensi record
 *     tags: [Asistensi]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: praktikumId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               kehadiran:
 *                 type: boolean
 *               nilai_asistensi:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Asistensi record updated successfully
 *       404:
 *         description: Asistensi record not found
 */
router.put('/:userId/:praktikumId', checkRole(['admin', 'asisten_lab']), updateAsistensi);

/**
 * @swagger
 * /api/asistensi:
 *   get:
 *     summary: Get all asistensi records
 *     tags: [Asistensi]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all asistensi records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Asistensi'
 */
router.get('/', getAllAsistensi);

/**
 * @swagger
 * /api/asistensi/praktikum/{praktikumId}:
 *   get:
 *     summary: Get asistensi records by praktikum ID
 *     tags: [Asistensi]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: praktikumId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of asistensi records for the praktikum
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Asistensi'
 */
router.get('/praktikum/:praktikumId', getAsistensiByPraktikum);

/**
 * @swagger
 * /api/asistensi/user/{userId}:
 *   get:
 *     summary: Get asistensi records by user ID
 *     tags: [Asistensi]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of asistensi records for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Asistensi'
 */
router.get('/user/:userId', getAsistensiByUser);

module.exports = router;