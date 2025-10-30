import { Router } from 'express';
import * as petController from '../controllers/pet.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';

const router = Router();

// public
router.get('/', petController.listPets);
router.get('/:id', petController.getPet);

// protected - admin create/update/delete
router.post('/', authMiddleware, requireRole('admin'), petController.createPet);
router.put('/:id', authMiddleware, requireRole('admin'), petController.updatePet);
router.delete('/:id', authMiddleware, requireRole('admin'), petController.removePet);

export default router;
