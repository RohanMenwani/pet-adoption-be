import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const user = await authService.registerUser(name, email, password);
  const token = authService.generateToken(user);
  res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await authService.loginUser(email, password);
  const token = authService.generateToken(user);
  res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
}

export async function getProfile(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const user = await authService.getProfile(userId);
  res.json(user);
}
