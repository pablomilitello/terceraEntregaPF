import { Router } from 'express';
import {
  addProducts,
  deleteProducts,
  deleteProductsById,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/products.controller.js';
import { authAdmin, authPremium } from '../middlewares/auth.js';

const router = Router();

router.get('/', getProducts);
router.get('/:pid', getProductById);
router.post('/', authAdmin, authPremium, addProducts);
router.put('/:pid', authAdmin, updateProduct);
router.delete('/', authAdmin, deleteProducts);
router.delete('/:pid', authAdmin, deleteProductsById);

export default router;
