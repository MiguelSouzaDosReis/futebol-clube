import { Request, Response } from 'express';
import Teams from '../database/models/teams';
import Matches from '../database/models/matches';

const everthingMatches = async (req: Request, res: Response) => {
  const modelTeamsHome = { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } };
  const modelTeamsAway = { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } };
  const model = [modelTeamsHome, modelTeamsAway];
  const everthing = await Matches.findAll({ include: model });
  const { inProgress } = req.query;
  if (inProgress === 'true') {
    const trueProgress = await Matches.findAll({ where: { inProgress: true }, include: model });
    return res.status(200).json({ trueProgress });
  }
  if (inProgress === 'false') {
    const falseProgress = await Matches.findAll({ where: { inProgress: false }, include: model });
    return res.status(200).json({ falseProgress });
  }
  return res.status(200).json(everthing);
};

export default everthingMatches;
