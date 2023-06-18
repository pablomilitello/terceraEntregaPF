import { Router } from 'express';
import { logger } from '../utils/winston.js';

const router = Router();

router.get('/', (req, res) => {
  logger.fatal('Mostrando log fatal');
  logger.error('Mostrando log error');
  logger.warning('Mostrando log warning');
  logger.info('Mostrando log info');
  logger.http('Mostrando log http');
  logger.debug('Mostrando log debug');
  res.send('My first Logger in Winston');
});

export default router;
