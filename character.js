const { Schema, model } = require('mongoose');

const bookSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    }, 
    modified: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    thumbnail: {
      type: String,
      default: null,
    },
    comics: {
      type: Array,
      default: null,
    }, 
  },
  { versionKey: false },
);

module.exports = model('Character', bookSchema);
