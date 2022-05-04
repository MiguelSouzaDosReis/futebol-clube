import { Request, Response, NextFunction } from 'express';
import * as Jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';
import * as path from 'path';
import User from '../database/models/user';

const validEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const whereUser = await User.findOne({ where: { email } });
  if (email === undefined || email.length === 0) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (password === undefined || password.length === 0) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (email !== whereUser?.email) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
};

interface TokenData {
  email: string,
  iat: number,
  exp: number
}
interface TokenInReq extends Request {
  tokenData?: { email: string, iat: number, exp: number };
}

export const validToken = async (req: TokenInReq, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const secret = await fs.readFile(path.resolve(__dirname, '../../jwt.evaluation.key'));
  if (authorization === undefined) {
    return res.status(500).json({ message: 'faltou token' });
  }
  try {
    const verifiy = Jwt.verify(authorization, secret) as TokenData;
    req.tokenData = verifiy;
    const { email } = req.tokenData;
    const whereUser = await User.findOne({ where: { email } });
    const role = whereUser?.role;
    if (verifiy) {
      res.status(200).json(role);
    }
  } catch (error) {
    return res.status(500).json({ message: 'deu erro de token' });
  }
  next();
};
export default validEmail;
