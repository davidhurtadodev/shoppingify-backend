/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  isCancelled: { type: Boolean, required: true },
  date: { type: Date, required: true },
  items: [
    new mongoose.Schema(
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Item',
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
      { _id: false }
    ),
    //  }, { _id: false }) {
    //     item: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       required: true,
    //       ref: 'Item',
    //     },
    //     quantity: {
    //       type: Number,
    //       required: true,
    //     },
    //   },
  ],
});

ListSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('List', ListSchema);
