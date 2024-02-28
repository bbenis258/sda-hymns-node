const express = require('express');
const Hymn = require('../schema/hymn');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Hymn:
 *       type: object
 *       required:
 *         - number
 *         - title
 *         - hymnContent
 *       properties:
 *         number:
 *           type: number
 *           description: The number of the hymn
 *         title:
 *           type: string
 *           description: The title of the hymn
 *         hymnContent:
 *           type: array
 *           description: The verses of the hymn
 *           items:
 *             type: object
 *             required:
 *               - order
 *               - subTitle
 *               - content
 *             properties:
 *               order:
 *                 type: number
 *                 description: The order of the verse
 *               subTitle:
 *                 type: string
 *                 description: The naming of the verse
 *               content:
 *                 type: string
 *                 description: The content of the verse
 *     HymnResponse:
 *       type: object
 *       required:
 *         - _id
 *         - number
 *         - title
 *         - hymnContent
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated unique identifier of the hymn in the database
 *         number:
 *           type: number
 *           description: The number of the hymn
 *         title:
 *           type: string
 *           description: The title of the hymn
 *         hymnContent:
 *           type: array
 *           description: The verses of the hymn
 *           items:
 *             type: object
 *             required:
 *               - _id
 *               - order
 *               - subTitle
 *               - content
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The auto-generated unique identifier of the verse in the database
 *               order:
 *                 type: number
 *                 description: The order of the verse
 *               subTitle:
 *                 type: string
 *                 description: The naming of the verse
 *               content:
 *                 type: string
 *                 description: The content of the verse
 */

/**
 * @swagger
 * /api/hymns:
 *   post:
 *     tags:
 *       - HymnController
 *     summary: Create a new hymn
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hymn'
 *     responses:
 *       201:
 *         description: Hymn Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HymnResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 index:
 *                   type: number
 *                 code:
 *                   type: number
 *                 keyPattern:
 *                   type: object
 *                   properties:
 *                     number:
 *                       type: number
 *                 keyValue:
 *                   type: object
 *                   properties:
 *                     number:
 *                       type: number
 */
router.post('/api/hymns', async (req, res) => {
  const { number, title, hymnContent } = req.body;

  try {
    const hymn = new Hymn({ number, title, hymnContent });
    await hymn.save();
    res.status(201).send(hymn);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

/**
 * @swagger
 * /api/hymns:
 *   get:
 *     tags:
 *       - HymnController
 *     summary: Get all hymns
 *     responses:
 *       200:
 *         description: Hymns Found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HymnResponse'
 */
router.get('/api/hymns', async (req, res) => {
  try {
    const hymns = await Hymn.find({});
    res.status(200).send(hymns);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

/**
 * @swagger
 * /api/hymns/{number}:
 *   get:
 *     tags:
 *       - HymnController
 *     summary: Get hymn by number
 *     parameters:
 *       - in: path
 *         name: number
 *         schema:
 *           type: number
 *         required: true
 *         description: The number of the hymn
 *     responses:
 *       200:
 *         description: Hymn Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HymnResponse'
 *       404:
 *         description: Hymn Not Found
 */
router.get('/api/hymns/:number', async (req, res) => {
  const { number } = req.params;

  try {
    const filter = { number: number };
    const hymns = await Hymn.find(filter);
    res.status(200).send(hymns);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

/**
 * @swagger
 * /api/hymns/search/{searchTerm}:
 *   get:
 *     tags:
 *       - HymnController
 *     summary: Search hymn using a keyword
 *     parameters:
 *       - in: path
 *         name: searchTerm
 *         schema:
 *           type: string
 *         required: true
 *         description: The search keyword
 *     responses:
 *       200:
 *         description: Hymns Found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HymnResponse'
 */
router.get('/api/hymns/search/:searchTerm', async (req, res) => {
  const { searchTerm } = req.params;

  try {
    const hymns = await Hymn.find({ $text: { $search: searchTerm } });
    res.status(200).send(hymns);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

/**
 * @swagger
 * /api/hymns/{number}:
 *   put:
 *     tags:
 *       - HymnController
 *     summary: Update hymn by number
 *     parameters:
 *       - in: path
 *         name: number
 *         schema:
 *           type: number
 *         required: true
 *         description: The number of the hymn
 *     responses:
 *       200:
 *         description: Hymn Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HymnResponse'
 */
router.put('/api/hymns/:number', async (req, res) => {
  const { number } = req.params;
  const { title, hymnContent } = req.body;

  try {
    const filter = { number: number };
    const hymn = await Hymn.findOneAndUpdate(filter, { title, hymnContent }, { new: true });
    res.status(200).send(hymn);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

/**
 * @swagger
 * /api/hymns/{number}:
 *   delete:
 *     tags:
 *       - HymnController
 *     summary: Delete hymn by number
 *     parameters:
 *       - in: path
 *         name: number
 *         schema:
 *           type: number
 *         required: true
 *         description: The number of the hymn
 *     responses:
 *       200:
 *         description: Hymn Deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HymnResponse'
 */
router.delete('/api/hymns/:number', async (req, res) => {
  const { number } = req.params;

  try {
    const filter = { number: number };
    const hymn = await Hymn.findOneAndDelete(filter);
    res.status(200).send(hymn);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});



/**
 * @swagger
 * /api/hymns/by-id/{id}:
 *   delete:
 *     tags:
 *       - HymnController
 *     summary: Delete hymn by _id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique id of the hymn in the database
 *     responses:
 *       200:
 *         description: Hymn Deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HymnResponse'
 */
router.delete('/api/hymns/by-id/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const filter = { _id: id };
    const hymn = await Hymn.findOneAndDelete(filter);
    res.status(200).send(hymn);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
