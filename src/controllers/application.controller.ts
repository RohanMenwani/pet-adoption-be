import { Request, Response } from 'express';
import * as applicationService from '../services/application.service';

export async function apply(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const { petId, message } = req.body;
  const app = await applicationService.applyToPet(userId, petId, message);
  res.status(201).json(app);
}

export async function listUserApplications(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const apps = await applicationService.getApplicationsForUser(userId);
  res.json(apps);
}

export async function listAllApplications(req: Request, res: Response) {
  const apps = await applicationService.getAllApplications();
  res.json(apps);
}

export async function processApp(req: Request, res: Response) {
  const { id } = req.params;
  const { action, note } = req.body; // action: 'approve' | 'reject'
  const app = await applicationService.processApplication(id, action, note);
  res.json(app);
}

export async function getApplicationById(req: Request, res: Response) {
  const app = await applicationService.getApplicationById(req.params.id);
  res.json(app);
}

export async function updateApplicationStatus(req: Request, res: Response) {
  const { id } = req.params;
  const { status, note } = req.body;
  const adminId = (req as any).user.id;
  const updated = await applicationService.updateApplicationStatus(id, status, adminId, note);
  res.json(updated);
}
