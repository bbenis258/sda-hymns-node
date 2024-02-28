const express = require('express');
const Hymn = require('../schema/hymn');

const router = express.Router();

/**
 * @swagger
 * /api/hymns:
 *   post:
 *     tags:
 *       - Hymn Controller
 *     summary: Create a new hymn
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - number
 *               - title
 *               - hymnContent
 *             properties:
 *               number:
 *                 type: number
 *               title:
 *                 type: string
 *               hymnContent:
 *                 type: array
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       409:
 *         description: Conflict
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
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
 *       - Hymn Controller
 *     summary: Get all hymns
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       409:
 *         description: Conflict
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
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

// Get hymn by number
router.get('/hymns/:number', async (req, res) => {
  const { number } = req.params;

  try {
    const filter = { number: number };
    const hymns = await Hymn.find(filter);
    res.send(hymns);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Search hymn
router.get('/hymns/search/:searchTerm', async (req, res) => {
  const { searchTerm } = req.params;

  try {
    const hymns = await Hymn.find({ $text: { $search: searchTerm } });
    res.send(hymns);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Update a hymn
router.put('/hymns/:number', async (req, res) => {
  const { number } = req.params;
  const { title, hymnContent } = req.body;

  try {
    const filter = { number: number };
    const hymn = await Hymn.findOneAndUpdate(filter, { title, hymnContent }, { new: true });
    res.send(hymn);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Delete a hymn
router.delete('/hymns/:number', async (req, res) => {
  const { number } = req.params;

  try {
    const filter = { number: number };
    const hymn = await Hymn.findOneAndDelete(filter);
    res.send(hymn);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
