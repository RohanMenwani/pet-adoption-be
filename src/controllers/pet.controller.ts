import { Request, Response } from 'express';
import * as petService from '../services/pet.service';

export async function createPet(req: Request, res: Response) {
  const created = await petService.createPet({ ...req.body, createdBy: (req as any).user.id });
  res.status(201).json(created);
}

export async function listPets(req: Request, res: Response) {
  const page = parseInt((req.query.page as string) || '1', 10);
  const limit = parseInt((req.query.limit as string) || '12', 10);
  const skip = (page - 1) * limit;
  const result = await petService.getPets(req.query, skip, limit);
  res.json(result);
}

export async function getPet(req: Request, res: Response) {
  const pet = await petService.getPetById(req.params.id);
  if (!pet) return res.status(404).json({ message: 'Pet not found' });
  res.json(pet);
}

export async function updatePet(req: Request, res: Response) {
  const pet = await petService.updatePet(req.params.id, req.body);
  res.json(pet);
}

export async function removePet(req: Request, res: Response) {
  await petService.deletePet(req.params.id);
  res.json({ ok: true });
}
