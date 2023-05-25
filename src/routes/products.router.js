import { Router } from 'express';
import { __dirname } from '../utils.js';
import {
  addProducts,
  deleteProducts,
  deleteProductsById,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/products.controller.js';

const router = Router();

router.get('/', getProducts);
router.get('/:pid', getProductById);
router.post('/', addProducts);
router.put('/:pid', updateProduct);
router.delete('/', deleteProducts);
router.delete('/:pid', deleteProductsById);

export default router;
