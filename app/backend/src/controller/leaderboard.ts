import { Request, Response } from 'express';
import Teams from '../database/models/teams';
import Matches from '../database/models/matches';

const objectHomeResulst = {
  name: 'Santos',
  totalPoints: '9',
  totalGames: '3',
  totalVictories: '3',
  totalDraws: '0',
  totalLosses: '0',
  goalsFavor: '9',
  goalsOwn: '3',
  goalsBalance: '6',
  efficiency: '100',
};

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

const everthingLeaderboard = async (_req: Request, res: Response) => {
  const everthingMatches = await Matches
    .findAll({ where: { inProgress: false }, include: model }) as unknown as IMatches[];
  const everthingTeams = await Teams.findAll();
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
  const results2 = everthingTeams.map((element) => {
    const MatcheTeamHome = arrayMatches.filter((e) => element.teamName === e.homeTeam);
    let vitoriaPontos = 0;
    let vitoriaPartida = 0;
    let empatePartida = 0;
    let derrotaPartida = 0;
    let goalsMarcado = 0;
    let goalsContra = 0;
    MatcheTeamHome.forEach((el) => {
      goalsMarcado += el.homeTeamGoals;
      goalsContra += el.awayTeamGoals;
      if (el.homeTeamGoals > el.awayTeamGoals) {
        vitoriaPontos += 3;
        vitoriaPartida += 1;
      }
      if (el.homeTeamGoals === el.awayTeamGoals) {
        vitoriaPontos += 1;
        empatePartida += 1;
      }
      if (el.homeTeamGoals < el.awayTeamGoals) {
        derrotaPartida += 1;
      }
    });
    const balanceamentoDeGoals = goalsMarcado - goalsContra;
    const eficienciaEmCampo = vitoriaPontos / (MatcheTeamHome.length * 3) * 100;
    return {
      name: element.teamName,
      totalPoints: vitoriaPontos,
      totalGames: MatcheTeamHome.length,
      totalVictories: vitoriaPartida,
      totalDraws: empatePartida,
      totalLosses: derrotaPartida,
      goalsFavor: goalsMarcado,
      goalsOwn: goalsContra,
      goalsBalance: balanceamentoDeGoals,
      efficiency: eficienciaEmCampo.toFixed(2),
    };
    // return MatcheTeamHome
  });
      const ordem = results2.sort((a,b): any  =>  {
      if (b.totalPoints < a.totalPoints){
        return b.totalPoints - a.totalPoints
      }
      if(b.totalVictories < a.totalVictories){
        return b.totalVictories - a.totalVictories
      }
      if (b.goalsBalance < a.goalsBalance){
        return b.goalsBalance - a.goalsBalance
      }
      if(b.goalsFavor < a.goalsFavor){
        return b.goalsFavor - a.goalsFavor
      }
      if(b.goalsOwn < a.goalsOwn){
        return b.goalsOwn - a.goalsOwn
      }
    })

  res.json(ordem);
};

export default everthingLeaderboard;
