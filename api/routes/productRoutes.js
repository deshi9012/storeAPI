import express from 'express';
import checkAuth from '../middleware/check-auth';
import checkProduct from '../middleware/check-product';
import {
  addNewProduct,
  getProductWithId,
  getAllProducts,
  deleteProduct,
  updateProduct
} from '../../controllers/productController';
const router = express.Router();

//Get all products
router.get('/', getAllProducts);

//get single product by id
router.get('/:productId', checkAuth, getProductWithId);

//Create new product
router.post('/', checkAuth, addNewProduct);

//Remove product
router.delete('/:productId', checkAuth, checkProduct, deleteProduct);

//Update product
router.patch('/:productId', checkAuth, checkProduct, updateProduct);

module.exports = router;
