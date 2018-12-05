import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  name: {
    type: String,
    required: 'Enter Product Name'
  },
  category: {
    type: String,
    required: 'Enter Category Name'
  },
  price: {
    type: Number,
    required: 'Enter Price '
  }
});

module.exports = mongoose.model('Product', ProductSchema);
