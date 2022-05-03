import { Request, Response, NextFunction } from 'express';
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
export default validEmail;
