import { Router } from 'express';
import * as applicationController from '../controllers/application.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';

const router = Router();

router.post('/', authMiddleware, applicationController.apply);
router.get('/me', authMiddleware, applicationController.listUserApplications);
router.get('/', authMiddleware, requireRole('admin'), applicationController.listAllApplications);
router.post('/:id/process', authMiddleware, requireRole('admin'), applicationController.processApp);

export default router;
