import Product from '../../models/productModel';
import mongoose from 'mongoose';
module.exports = (req, res, next) => {
  const id = req.params.productId;
  Product.findOne({ _id: id })
    .exec()
    .then(result => {
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
