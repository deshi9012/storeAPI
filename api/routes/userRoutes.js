import express from 'express';
import {
  signUp,
  deleteUser,
  loginUser
} from '../../controllers/userController';
const router = express.Router();

router.post('/signup', signUp);
router.delete('/:userId', deleteUser);
router.post('/login', loginUser);
module.exports = router;
