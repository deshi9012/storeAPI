import mongoose from 'mongoose';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUp = (req, res) => {
  User.find({ username: req.body.username })
    .then(user => {
      //user already exist
      if (user.length >= 1) {
        return res.status(422).json({
          message: ' User already exist'
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: 'User created'
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    })
    .catch();
};

export const deleteUser = (req, res) => {
  const id = req.params.userId;
  User.deleteOne({ _id: id })
    .then(result => {
      return res.status(200).json({
        message: 'User deleted'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

export const loginUser = (req, res) => {
  User.find({ username: req.body.username })
    .then(user => {
      //if we got no user
      //login failed
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth failed. Username or password is incorrect'
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (error, result) => {
        //passwords not match
        if (error) {
          return res.status(401).json({
            message: 'Auth failed. Username or password is incorrect'
          });
        }
        //passwords match
        if (result) {
          const token = jwt.sign(
            {
              userId: user[0]._id,
              username: user[0].username
            },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
          );
          return res.status(200).json({
            message: 'Auth successful',
            token: token
          });
        }
        //other error
        return res.status(401).json({
          message: 'Auth failed.'
        });
      });
    })
    .catch();
};
