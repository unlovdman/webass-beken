const express = require('express');
const router = express.Router();
const {
  updateNilai,
  getAllNilai,
  getNilaiByUser,
  getNilaiByPraktikum,
  getNilaiSummary
} = require('../controllers/nilaiController');
const { auth, checkRole } = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Nilai:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         id_user:
 *           type: integer
 *         id_praktikum:
 *           type: integer
 *         nilai_praktikum:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 100
 *         nilai_asistensi:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 100
 *         nilai_laporan:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 100
 *         nilai_akhir:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 100
 */

// All routes require authentication
router.use(auth);

/**
 * @swagger
 * /api/nilai/update:
 *   post:
 *     summary: Create or update nilai
 *     tags: [Nilai]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_user:
 *                 type: integer
 *               id_praktikum:
 *                 type: integer
 *               nilai_praktikum:
 *                 type: number
 *                 format: float
 *               nilai_asistensi:
 *                 type: number
 *                 format: float
 *               nilai_laporan:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Nilai updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 */
router.post('/update', checkRole(['admin', 'asisten_lab']), updateNilai);

/**
 * @swagger
 * /api/nilai:
 *   get:
 *     summary: Get all nilai
 *     tags: [Nilai]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all nilai
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Nilai'
 */
router.get('/', checkRole(['admin', 'asisten_lab']), getAllNilai);

/**
 * @swagger
 * /api/nilai/praktikum/{praktikumId}:
 *   get:
 *     summary: Get nilai by praktikum ID
 *     tags: [Nilai]
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
 *         description: List of nilai for the praktikum
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Nilai'
 */
router.get('/praktikum/:praktikumId', checkRole(['admin', 'asisten_lab']), getNilaiByPraktikum);

/**
 * @swagger
 * /api/nilai/user/{userId}:
 *   get:
 *     summary: Get nilai by user ID
 *     tags: [Nilai]
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
 *         description: List of nilai for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Nilai'
 */
router.get('/user/:userId', getNilaiByUser);

/**
 * @swagger
 * /api/nilai/summary/{userId}:
 *   get:
 *     summary: Get nilai summary for a user
 *     tags: [Nilai]
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
 *         description: Nilai summary with averages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nilai:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Nilai'
 *                 rata_rata:
 *                   type: object
 *                   properties:
 *                     praktikum:
 *                       type: number
 *                     asistensi:
 *                       type: number
 *                     laporan:
 *                       type: number
 *                     akhir:
 *                       type: number
 */
router.get('/summary/:userId', getNilaiSummary);

module.exports = router;