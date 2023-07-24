import { Router } from 'express';
import { togglePremium, uploadFiles } from '../controllers/users.controller.js';
import { uploader } from '../utils/utils.js';

const router = Router();

router.post('/premium/:uid', togglePremium);
router.post('/:uid/documents', uploader.array('files', 5), uploadFiles);

export default router;
