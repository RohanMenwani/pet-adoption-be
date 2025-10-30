import { Request, Response, NextFunction } from 'express';

export function requireRole(role: 'admin' | 'user') {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    if (role === 'admin' && user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    next();
  };
}
