import { Router } from 'express';
import { getChat, getHome, getProducts, getRealTimeProducts } from '../controllers/views.controller.js';

const router = Router();

router.get('/', getHome);
router.get('/products', getProducts);
router.get('/realtimeproducts', getRealTimeProducts);
router.get('/chat', getChat);

export default router;
