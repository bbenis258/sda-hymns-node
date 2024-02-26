const express = require('express');
const Hymn = require('./hymn');

const router = express.Router();

// Create a new hymn
router.post('/hymns', async (req, res) => {
  const { number, title, hymnContent } = req.body;

  try {
    const hymn = new Hymn({ number, title, hymnContent });
    await hymn.save();
    res.send(hymn);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Get all hymns
router.get('/hymns', async (req, res) => {
  try {
    const hymns = await Hymn.find({});
    res.send(hymns);
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
