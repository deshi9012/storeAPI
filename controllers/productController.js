import mongoose from 'mongoose';

import Product from '../models/productModel';

export const addNewProduct = (req, res) => {
  let newProduct = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    category: req.body.category,
    price: req.body.price
  });

  newProduct
    .save()
    .then(product => {
      console.log(product);
      res.status(201).json({
        message: 'Created product succesfully',
        createdProduct: {
          _id: product._id,
          name: product.name,
          category: product.category,
          price: product.price
        }
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

export const getAllProducts = (req, res) => {
  Product.find()
    .select('name category price _id')
    .exec()
    .then(products => {
      if (products.length <= 0) {
        return res.status(204).json({
          message: 'No content'
        });
      }
      const response = {
        count: products.length,
        products: products.map(product => {
          return {
            id: product._id,
            name: product.name,
            category: product.category,
            price: product.price
          };
        })
      };
      console.log(products);

      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

export const getProductWithId = (req, res) => {
  const id = req.params.productId;

  Product.findById(id)
    .select('name category price _id')
    .exec()
    .then(product => {
      console.log(product);
      if (product) {
        res.status(200).json({
          product: product,
          request: {
            type: 'GET',
            description: 'Get all products',
            url: 'http://localhost:3000/products/' + product._id
          }
        });
      } else {
        res.status(404).json({ message: 'No valid endtry for provided ID' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

export const updateProduct = (req, res) => {
  const id = req.params.productId;
  const updatedOptions = {};

  //Loop through the values wants to change
  for (const option of Object.keys(req.body)) {
    updatedOptions[option] = req.body[option];
  }
  Product.findOneAndUpdate({ _id: id }, { $set: updatedOptions }, { new: true })
    .exec()
    .then(product => {
      res.status(200).json({
        message: 'Product updated',
        updatedProduct: product,
        request: {
          type: 'GET',
          description: 'Get this product',
          url: 'http://localhost:3000/products/' + product._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

export const deleteProduct = (req, res) => {
  const id = req.params.productId;
  Product.deleteOne({ _id: id })
    .exec()
    .then(response => {
      res.send(204).json({
        message: 'Product deleted'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
