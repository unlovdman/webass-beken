const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Kelompok:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nama_kelompok:
 *           type: string
 *         id_praktikum:
 *           type: integer
 *         anggota:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               nama:
 *                 type: string
 *               email:
 *                 type: string
 */

// All routes require authentication
router.use(auth);

/**
 * @swagger
 * /api/kelompok:
 *   post:
 *     summary: Create a new kelompok
 *     tags: [Kelompok]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama_kelompok:
 *                 type: string
 *               id_praktikum:
 *                 type: integer
 *               anggota_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Kelompok created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 */
router.post('/', checkRole(['admin', 'asisten_lab']), createKelompok);

/**
 * @swagger
 * /api/kelompok/{id}:
 *   put:
 *     summary: Update a kelompok
 *     tags: [Kelompok]
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
 *             type: object
 *             properties:
 *               nama_kelompok:
 *                 type: string
 *               anggota_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Kelompok updated successfully
 *       404:
 *         description: Kelompok not found
 */
router.put('/:id', checkRole(['admin', 'asisten_lab']), updateKelompok);

/**
 * @swagger
 * /api/kelompok/{id}:
 *   delete:
 *     summary: Delete a kelompok
 *     tags: [Kelompok]
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
 *         description: Kelompok deleted successfully
 *       404:
 *         description: Kelompok not found
 */
router.delete('/:id', checkRole(['admin']), deleteKelompok);

/**
 * @swagger
 * /api/kelompok/praktikum/{praktikumId}:
 *   get:
 *     summary: Get all kelompok for a praktikum
 *     tags: [Kelompok]
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
 *         description: List of kelompok for the praktikum
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Kelompok'
 */
router.get('/praktikum/:praktikumId', getKelompokByPraktikum);

/**
 * @swagger
 * /api/kelompok/user/{userId}:
 *   get:
 *     summary: Get kelompok for a user
 *     tags: [Kelompok]
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
 *         description: List of kelompok for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Kelompok'
 */
router.get('/user/:userId', getKelompokByUser);

/**
 * @swagger
 * /api/kelompok/{id}:
 *   get:
 *     summary: Get kelompok by ID
 *     tags: [Kelompok]
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
 *         description: Kelompok details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Kelompok'
 *       404:
 *         description: Kelompok not found
 */
router.get('/:id', getKelompokById);

module.exports = router; 