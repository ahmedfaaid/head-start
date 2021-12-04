import { Router } from 'express';
import { hello } from '../controllers';

const router = Router();

router.get('/', hello);

export default router;
