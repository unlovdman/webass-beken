const express = require('express');
const router = express.Router();
const {
  createPertemuan,
  getPertemuanByPraktikum,
  getPertemuanById,
  updatePertemuan,
  deletePertemuan
} = require('../controllers/pertemuanController');
const { auth, checkRole } = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Pertemuan:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         id_praktikum:
 *           type: integer
 *         nama_pertemuan:
 *           type: string
 *         urutan:
 *           type: integer
 *         tanggal:
 *           type: string
 *           format: date-time
 *         deskripsi:
 *           type: string
 *         materi:
 *           type: string
 *         status:
 *           type: string
 *           enum: [belum_mulai, berlangsung, selesai]
 */

// All routes require authentication
router.use(auth);

/**
 * @swagger
 * /api/pertemuan:
 *   post:
 *     summary: Create a new pertemuan
 *     tags: [Pertemuan]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pertemuan'
 *     responses:
 *       201:
 *         description: Pertemuan created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 */
router.post('/', checkRole(['admin', 'asisten_lab']), createPertemuan);

/**
 * @swagger
 * /api/pertemuan/{id}:
 *   put:
 *     summary: Update a pertemuan
 *     tags: [Pertemuan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pertemuan'
 *     responses:
 *       200:
 *         description: Pertemuan updated successfully
 *       404:
 *         description: Pertemuan not found
 */
router.put('/:id', checkRole(['admin', 'asisten_lab']), updatePertemuan);

/**
 * @swagger
 * /api/pertemuan/{id}:
 *   delete:
 *     summary: Delete a pertemuan
 *     tags: [Pertemuan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pertemuan deleted successfully
 *       404:
 *         description: Pertemuan not found
 */
router.delete('/:id', checkRole(['admin']), deletePertemuan);

/**
 * @swagger
 * /api/pertemuan/praktikum/{praktikumId}:
 *   get:
 *     summary: Get all pertemuan for a praktikum
 *     tags: [Pertemuan]
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
 *         description: List of pertemuan for the praktikum
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pertemuan'
 */
router.get('/praktikum/:praktikumId', getPertemuanByPraktikum);

/**
 * @swagger
 * /api/pertemuan/{id}:
 *   get:
 *     summary: Get pertemuan by ID
 *     tags: [Pertemuan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pertemuan details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pertemuan'
 *       404:
 *         description: Pertemuan not found
 */
router.get('/:id', getPertemuanById);

module.exports = router; 