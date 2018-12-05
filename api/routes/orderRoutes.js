import express from 'express';
import checkAuth from '../middleware/check-auth';
import checkOrder from '../middleware/check-order';
import {
  addNewOrder,
  getAllOrders,
  updateOrder,
  deleteOrder
} from '../../controllers/orderController';
const router = express.Router();

//Get all orders
router.get('/', checkAuth, getAllOrders);

//get single order by id
// router.get('/:orderId', getOrderWithId);

//Create new order
router.post('/', checkAuth, addNewOrder);

//Remove order
router.delete('/:orderId', checkAuth, checkOrder, deleteOrder);

//Update order
router.patch('/:orderId', checkAuth, checkOrder, updateOrder);

// //Update order
// router.patch('/:orderId', updateOrder);
// router.post('/', (req, res, next) => {
//   res.status(201).json({ message: 'POST' });
// });

module.exports = router;
