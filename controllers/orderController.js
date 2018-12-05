import mongoose from 'mongoose';

import Product from '../models/productModel';
import Order from '../models/orderModel';

export const addNewOrder = (req, res) => {
  if (!req.body.products || !Array.isArray(req.body.products)) {
    return res.status(400).json({
      message: 'Invalid request',
      error: 'Bad Request'
    });
  }
  if (req.body.products.length <= 0) {
    return res.status(422).json({
      message: 'Validation error',
      error: 'Products are required'
    });
  }

  Product.find({ _id: { $in: req.body.products } })
    .select('_id')
    .exec()
    .then(products => {
      const orderProducts = products.map(product => product._id);

      let newOrder = new Order({
        _id: new mongoose.Types.ObjectId(),
        status: req.body.status
      });

      newOrder.products = orderProducts;
      return newOrder
        .save()

        .then(order => {
          console.log(order);
          res.status(201).json({
            message: 'Created order succesfully',
            createdOrder: {
              _id: order._id,
              status: order.status,
              products: order.products,
              date: order.date
            }
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ error: err });
        });
    })
    .catch(err => {
      res.status(400).json({
        message: 'Invalid request',
        error: 'Bad Request'
      });
    });
};

export const getAllOrders = (req, res) => {
  Order.find()
    .select('date products status _id')
    .exec()
    .then(orders => {
      if (orders.length <= 0) {
        return res.status(204).json({
          message: 'No content'
        });
      }
      const response = {
        count: orders.length,
        orders: orders.map(order => {
          return {
            id: order._id,
            date: order.date,
            products: order.products,
            status: order.status
          };
        })
      };

      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

export const deleteOrder = (req, res) => {
  const id = req.params.orderId;
  Order.deleteOne({ _id: id })
    .then(response => {
      res.status(204).json({
        message: 'Order deleted successfully'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

export const updateOrder = (req, res) => {
  const id = req.params.orderId;
  // const updatedOptions = {};

  //Loop through the values wants to change

  // console.log(Object.keys(req.body));
  // for (const option of Object.keys(req.body)) {
  //   console.log(req.body);
  //   updatedOptions[option] = req.body[option];
  // }
  if (!req.body.status) {
    return res.status(422).json({
      message: 'Validation error',
      error: 'Status is required'
    });
  }

  Order.findOneAndUpdate(
    { _id: id },
    { $set: { status: req.body.status } },

    {
      runValidators: true,
      new: true
    }
  )
    .exec()
    .then(order => {
      res.status(200).json({
        message: 'Order updated',
        updatedOrder: order
      });
    })
    .catch(err => {
      if (err) {
        if (err.name === 'ValidationError') {
          const validationErrors = Object.keys(err.errors).map(
            (field, index) => {
              return err.errors[field].properties.message;
            }
          );
          return res.status(422).json({
            message: 'Validation Error',
            errors: validationErrors
          });
        } else {
          return res.status(500).json({ error: err });
        }
      }
    });
};
