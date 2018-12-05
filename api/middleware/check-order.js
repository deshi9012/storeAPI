import Order from '../../models/orderModel';
import mongoose from 'mongoose';
module.exports = (req, res, next) => {
  const id = req.params.orderId;
  Order.findOne({ _id: id })
    .exec()
    .then(result => {
      console.log(result);
      if (!result) {
        return res.status(404).json({ message: 'Data was not found' });
      }
      next();
    })
    .catch(err => {
      console.log(err instanceof mongoose.Error);
      if (err instanceof mongoose.CastError) {
        console.log('here');
        return res.status(404).json({ message: 'Data was not found' });
      }
      return res.status(500).json({ error: err });
    });
};
