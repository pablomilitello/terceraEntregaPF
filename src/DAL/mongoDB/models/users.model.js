import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
  },
  cart: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Carts',
  },
  role: {
    type: String,
    default: 'user',
  },
  orders: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Orders',
    },
  ],
});

export const userModel = mongoose.model('Users', usersSchema);
