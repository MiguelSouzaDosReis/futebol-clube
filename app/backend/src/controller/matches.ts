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

export const createMatche = async (req: Request, res: Response) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
  const create = await Matches.create({
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals,
    inProgress: true,
  });
  res.status(201).json(create);
};

export const finishTheMatche = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Matches.update({ inProgress: false }, { where: { id } });
  res.status(200).json({ menssage: 'alteração foi feita' });
};

export const UpdadeGoals = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  res.status(200).json({ menssage: 'alteração foi feita' });
};

export default everthingMatches;
