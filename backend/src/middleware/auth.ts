import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Authorization token required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    if (!token) throw new Error('Token missing');
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
};
