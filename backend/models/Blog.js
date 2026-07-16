const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: {
    type: String,
    enum: ['food', 'makeup', 'travel'],
    required: true
  },
  authorName: { type: String, required: true },
  publishDate: { type: Date, required: true },
  featuredImageUrl: String,
  readingTime: Number,
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  tags: [String],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });
module.exports = mongoose.model('Blog', blogSchema);
