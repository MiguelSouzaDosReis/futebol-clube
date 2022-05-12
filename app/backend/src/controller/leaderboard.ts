import { Request, Response } from 'express';
import Teams from '../database/models/teams';
import Matches from '../database/models/matches';
import filterMatches from '../helpers/filterMatches';
import sortLeaderboard from '../helpers/sortsLeaderboard';

interface IMatches {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamAway: { teamName: string };
  teamHome: { teamName: string };
}

const modelTeamsHome = { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } };
const modelTeamsAway = { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } };
const model = [modelTeamsHome, modelTeamsAway];

const matchesLeaderboard = async () => {
  const everthingMatches = await Matches
    .findAll({ where: { inProgress: false }, include: model }) as unknown as IMatches[];
  const arrayMatches = everthingMatches.map((element) => ({
    id: element.id,
    homeTeam: element.teamHome.teamName,
    homeTeamId: element.homeTeam,
    homeTeamGoals: element.homeTeamGoals,
    awayTeamId: element.awayTeam,
    awayTeamGoals: element.awayTeamGoals,
    inProgress: element.inProgress,
    teamAway: element.teamAway.teamName,
  }));
  return arrayMatches;
};

const everthingLeaderboard = async (_req: Request, res: Response) => {
  const everthingTeams = await Teams.findAll();
  const resultMatches = await matchesLeaderboard();
  const leaderboard = filterMatches(everthingTeams, resultMatches);
  const ordem = sortLeaderboard(leaderboard);
  res.json(ordem);
};

export default everthingLeaderboard;
