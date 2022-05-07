import { Request, Response } from 'express';
import Teams from '../database/models/teams';
import Matches from '../database/models/matches';

const everthingMatches = async (_req: Request, res: Response) => {
  const modelTeamsHome = { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } };
  const modelTeamsAway = { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } };
  const everthing = await Matches.findAll({ include: [modelTeamsHome, modelTeamsAway] });
  return res.status(200).json(everthing);
};

export default everthingMatches;
