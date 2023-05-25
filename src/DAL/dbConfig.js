import mongoose from 'mongoose';
import { MONGO_URI } from '../config.js';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Database connected'))
  .catch((error) => console.log(error));
