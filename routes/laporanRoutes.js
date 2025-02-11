const express = require('express');
const router = express.Router();
const {
  uploadLaporan,
  getAllLaporan,
  getLaporanByUser,
  getLaporanByPraktikum,
  updateNilaiLaporan
} = require('../controllers/laporanController');
const { auth, checkRole } = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Laporan:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         id_user:
 *           type: integer
 *         id_praktikum:
 *           type: integer
 *         file_laporan:
 *           type: string
 *         nilai_laporan:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 100
 */

// All routes require authentication
router.use(auth);

/**
 * @swagger
 * /api/laporan/upload:
 *   post:
 *     summary: Upload a new laporan
 *     tags: [Laporan]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id_praktikum:
 *                 type: integer
 *               file_laporan:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Laporan uploaded successfully
 *       400:
 *         description: Invalid input or file type
 *       401:
 *         description: Not authenticated
 */
router.post('/upload', uploadLaporan);

/**
 * @swagger
 * /api/laporan:
 *   get:
 *     summary: Get all laporan
 *     tags: [Laporan]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all laporan
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Laporan'
 */
router.get('/', checkRole(['admin', 'asisten_lab']), getAllLaporan);

/**
 * @swagger
 * /api/laporan/praktikum/{praktikumId}:
 *   get:
 *     summary: Get laporan by praktikum ID
 *     tags: [Laporan]
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
 *         description: List of laporan for the praktikum
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Laporan'
 */
router.get('/praktikum/:praktikumId', checkRole(['admin', 'asisten_lab']), getLaporanByPraktikum);

/**
 * @swagger
 * /api/laporan/user/{userId}:
 *   get:
 *     summary: Get laporan by user ID
 *     tags: [Laporan]
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
 *         description: List of laporan for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Laporan'
 */
router.get('/user/:userId', checkRole(['admin', 'asisten_lab']), getLaporanByUser);

/**
 * @swagger
 * /api/laporan/my-laporan:
 *   get:
 *     summary: Get current user's laporan
 *     tags: [Laporan]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's laporan
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Laporan'
 */
router.get('/my-laporan', (req, res) => getLaporanByUser(req.user.id));

/**
 * @swagger
 * /api/laporan/{userId}/{praktikumId}/nilai:
 *   put:
 *     summary: Update laporan nilai
 *     tags: [Laporan]
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
 *               nilai_laporan:
 *                 type: number
 *                 format: float
 *                 minimum: 0
 *                 maximum: 100
 *     responses:
 *       200:
 *         description: Laporan nilai updated successfully
 *       404:
 *         description: Laporan not found
 */
router.put('/:userId/:praktikumId/nilai', checkRole(['admin', 'asisten_lab']), updateNilaiLaporan);

module.exports = router;