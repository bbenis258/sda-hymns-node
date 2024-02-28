const mongoose = require('mongoose');

const hymnSchema = new mongoose.Schema({
  number: { type: Number, unique: true },
  title: String,
  hymnContent: [
    {
      order: Number,
      subTitle: String,
      content: String
    }
  ]
}, { collection: 'hymn_db' });

hymnSchema.index({ title: 'text', 'hymnContent.content': 'text' });

const Hymn = mongoose.model('Hymn', hymnSchema);

module.exports = Hymn;
