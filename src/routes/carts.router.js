import { Router } from 'express';
import {
  addCarts,
  addProductsToCart,
  deleteAllProductsFromCart,
  deleteProductFromCart,
  getCartByIdPopulated,
  purchase,
  updateCart,
  updateCartProduct,
} from '../controllers/carts.controller.js';
import { authUser } from '../middlewares/auth.js';

const router = Router();

router.get('/:cid', getCartByIdPopulated);
router.post('/', addCarts);
router.post('/:cid/product/:pid', authUser, addProductsToCart);
router.delete('/:cid/product/:pid', deleteProductFromCart);
router.delete('/:cid', deleteAllProductsFromCart);
router.put('/:cid', updateCart);
router.put('/:cid/product/:pid', updateCartProduct);
router.post('/:cid/purchase', purchase);

export default router;
