import mongoose from 'mongoose';
import Product from './productModel';
const Schema = mongoose.Schema;

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;

let yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd;
}
if (mm < 10) {
  mm = '0' + mm;
}

const dateNow = yyyy + '-' + mm + '-' + dd;
// document.getElementById('DATE').value = today;

const OrderSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
    default: 'Pending',
    required: true
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    }
  ],
  date: {
    type: String,
    default: dateNow
  }
});
module.exports = mongoose.model('Order', OrderSchema);
