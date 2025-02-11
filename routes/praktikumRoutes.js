const express = require('express');
const router = express.Router();
const { 
  createPraktikum, 
  getAllPraktikum, 
  getPraktikumById, 
  updatePraktikum, 
  deletePraktikum,
  getActivePraktikum
} = require('../controllers/praktikumController');
const { auth, checkRole } = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Praktikum:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nama_praktikum:
 *           type: string
 *         periode:
 *           type: integer
 *         tanggal_mulai:
 *           type: string
 *           format: date-time
 *         tanggal_selesai:
 *           type: string
 *           format: date-time
 *         deskripsi:
 *           type: string
 *         link_form:
 *           type: string
 *         status:
 *           type: string
 *           enum: [aktif, selesai]
 */

// All routes require authentication
router.use(auth);

/**
 * @swagger
 * /api/praktikum:
 *   post:
 *     summary: Create a new praktikum
 *     tags: [Praktikum]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Praktikum'
 *     responses:
 *       201:
 *         description: Praktikum created successfully
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 */
router.post('/', checkRole(['admin', 'asisten_lab']), createPraktikum);

/**
 * @swagger
 * /api/praktikum/{id}:
 *   put:
 *     summary: Update a praktikum
 *     tags: [Praktikum]
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
 *             $ref: '#/components/schemas/Praktikum'
 *     responses:
 *       200:
 *         description: Praktikum updated successfully
 *       404:
 *         description: Praktikum not found
 */
router.put('/:id', checkRole(['admin', 'asisten_lab']), updatePraktikum);

/**
 * @swagger
 * /api/praktikum/{id}:
 *   delete:
 *     summary: Delete a praktikum
 *     tags: [Praktikum]
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
 *         description: Praktikum deleted successfully
 *       404:
 *         description: Praktikum not found
 */
router.delete('/:id', checkRole(['admin']), deletePraktikum);

/**
 * @swagger
 * /api/praktikum:
 *   get:
 *     summary: Get all praktikum
 *     tags: [Praktikum]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all praktikum
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Praktikum'
 */
router.get('/', getAllPraktikum);

/**
 * @swagger
 * /api/praktikum/active:
 *   get:
 *     summary: Get all active praktikum
 *     tags: [Praktikum]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of active praktikum
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Praktikum'
 */
router.get('/active', getActivePraktikum);

/**
 * @swagger
 * /api/praktikum/{id}:
 *   get:
 *     summary: Get praktikum by ID
 *     tags: [Praktikum]
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
 *         description: Praktikum details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Praktikum'
 *       404:
 *         description: Praktikum not found
 */
router.get('/:id', getPraktikumById);

module.exports = router; 