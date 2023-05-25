import { Router } from 'express';
import {
  addCarts,
  addProductsToCart,
  deleteAllProductsFromCart,
  deleteProductFromCart,
  getCartByIdPopulated,
  updateCart,
  updateCartProduct,
} from '../controllers/carts.controller.js';

const router = Router();

router.get('/:cid', getCartByIdPopulated);
router.post('/', addCarts);
router.post('/:cid/product/:pid', addProductsToCart);
router.delete('/:cid/product/:pid', deleteProductFromCart);
router.delete('/:cid', deleteAllProductsFromCart);
router.put('/:cid', updateCart);
router.put('/:cid/product/:pid', updateCartProduct);

export default router;
