import { Request, Response } from 'express';
import { User, Iuser } from '../db/models/User';
import { runInNewContext } from 'vm';

export class Auth {

  static token: string;
  static user = {} as Iuser;

  general(req: Request, res: Response, next: any) {
    const { user } = Auth;
    if (req.headers.authorization) Auth.token = req.headers.authorization.split(' ')[1];
    if (Auth.token) [user.firstName, user.role] = Auth.token.split(',');
    if (!user.firstName || !user.role) return res.status(401).json({ message: 'unauthorized' });
    next();
  }

  admin(req: Request, res: Response, next: any) {
    if (Auth.user.role !== 'admin') return res.status(401).json({
      message: 'admin required'
    });
    next();
  }

}

export const auth = new Auth();