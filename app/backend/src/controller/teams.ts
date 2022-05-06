import { Request, Response } from 'express';
import Teams from '../database/models/teams';

const everthingTeams = async (_req: Request, res: Response) => {
  const everthing = await Teams.findAll();
  return res.status(200).json(everthing);
};

export const everthingIdTeams = async (req: Request, res: Response) => {
  const { id } = req.params;
  const everthingId = await Teams.findOne({ where: { id } });

  res.status(200).json(everthingId);
};

export default everthingTeams;
