import mongoose from 'mongoose';

const ordersSchema = new mongoose.Schema({
  order_number: {
    type: Number,
    required: true,
  },
  business: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Business',
  },
  users: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'BUsers',
  },
  products: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Products' }],
  price: {
    type: Number,
    required: true,
  },
});

export const orderModel = mongoose.model('Orders', ordersSchema);
