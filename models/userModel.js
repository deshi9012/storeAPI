import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('User', UserSchema);
