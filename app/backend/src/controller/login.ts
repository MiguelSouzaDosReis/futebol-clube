import { Request, Response } from 'express';
import * as fs from 'fs/promises';
import * as Jwt from 'jsonwebtoken';
import * as path from 'path';
import { compare } from 'bcrypt';
import User from '../database/models/user';

const JwtConfig: Jwt.SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};
const createLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const secret = await fs.readFile(path.resolve(__dirname, '../../jwt.evaluation.key'));
  const jwtToken = Jwt.sign({ email }, secret, JwtConfig);
  const whereUser = await User.findOne({ where: { email } });
  if (await compare(password, whereUser!.password)) {
    return res.status(200).json({
      user: { id: whereUser?.id,
        username: whereUser?.username,
        role: whereUser?.role,
        email: whereUser?.email,
      },
      token: jwtToken,
    });
  }
  return res.status(401).json({ message: 'Incorrect email or password' });
};

export default createLogin;
