import { Router } from 'express';
import { enterDocuments, togglePremium } from '../controllers/users.controller.js';

const router = Router();

router.post('/premium/:uid', togglePremium);
router.post('/:uid/documents', enterDocuments);

export default router;
