/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  status: { type: String, required: true },
  date: { type: String, required: true },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Item',
    },
  ],
});

ListSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Category', ListSchema);
