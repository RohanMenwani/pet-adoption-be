import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import * as adminController from '../controllers/admin.controller';

const router = Router();

router.get('/stats', authMiddleware, requireRole('admin'), adminController.getDashboardStats);

export default router;
