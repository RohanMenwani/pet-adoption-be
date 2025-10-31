import { Request, Response } from 'express';
import * as adminService from '../services/admin.service';

export async function getDashboardStats(req: Request, res: Response) {
  const stats = await adminService.getDashboardStats();
  res.json(stats);
}
