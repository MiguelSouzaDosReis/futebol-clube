const ifDerrota = (homeTeamGoals: number, awayTeamGoals: number, score: Iscore) => {
  const pontos = score;
  if (homeTeamGoals < awayTeamGoals) {
    pontos.derrotaPartida += 1;
  }
};

const scoreOfMatches = (homeTeamGoals: number, awayTeamGoals: number, score: Iscore): void => {
  const pontos = score;
  if (homeTeamGoals === awayTeamGoals) {
    pontos.vitoriaPontos += 1;
    pontos.empatePartida += 1;
  }
  if (homeTeamGoals > awayTeamGoals) {
    pontos.vitoriaPontos += 3;
    pontos.vitoriaPartida += 1;
  }
  ifDerrota(homeTeamGoals, awayTeamGoals, score);
};
interface Iscore {
  vitoriaPontos: number,
  vitoriaPartida: number,
  empatePartida: number,
  derrotaPartida: number,
}
interface IscoreMatche extends Iscore {
  goalsMarcado: number,
  goalsContra: number,
}

const matchesTeamsHomeForEach = (MatcheTeamHome: IarrayMatches[]): IscoreMatche => {
  let goalsMarcado = 0;
  let goalsContra = 0;
  const score: Iscore = {
    vitoriaPontos: 0,
    vitoriaPartida: 0,
    empatePartida: 0,
    derrotaPartida: 0,
  };
  MatcheTeamHome.forEach((el: IarrayMatches) => {
    goalsMarcado += el.homeTeamGoals;
    goalsContra += el.awayTeamGoals;
    const { homeTeamGoals, awayTeamGoals } = el;
    scoreOfMatches(homeTeamGoals, awayTeamGoals, score);
  });
  return { goalsMarcado,
    goalsContra,
    ...score,
  };
};
const createLeaderboards = (MatcheTeamHome: IarrayMatches[]) => {
  const forEachTeamMatches = matchesTeamsHomeForEach(MatcheTeamHome);
  const balanceamentoDeGoals = forEachTeamMatches.goalsMarcado - forEachTeamMatches.goalsContra;
  const eficienciaEmCampo = (forEachTeamMatches.vitoriaPontos / (MatcheTeamHome.length * 3)) * 100;
  return {
    vitoriaPontos: forEachTeamMatches.vitoriaPontos,
    vitoriaPartida: forEachTeamMatches.vitoriaPartida,
    empatePartida: forEachTeamMatches.empatePartida,
    derrotaPartida: forEachTeamMatches.derrotaPartida,
    goalsMarcado: forEachTeamMatches.goalsMarcado,
    goalsContra: forEachTeamMatches.goalsContra,
    balanceamentoDeGoals,
    eficienciaEmCampo: parseFloat(eficienciaEmCampo.toFixed(2)),
  };
};

interface Iteams {
  teamName: string
}
interface IarrayMatches {
  id: number,
  homeTeam: string,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamAway: string,
}

const filterMatches = (everthingTeams: Iteams[], arrayMatches: IarrayMatches[]) => {
  const results = everthingTeams.map((element) => {
    const MatcheTeamHome: IarrayMatches[] = arrayMatches
      .filter((e) => element.teamName === e.homeTeam);
    const retornoMatche = createLeaderboards(MatcheTeamHome);
    return {
      name: element.teamName,
      totalPoints: retornoMatche.vitoriaPontos,
      totalGames: MatcheTeamHome.length,
      totalVictories: retornoMatche.vitoriaPartida,
      totalDraws: retornoMatche.empatePartida,
      totalLosses: retornoMatche.derrotaPartida,
      goalsFavor: retornoMatche.goalsMarcado,
      goalsOwn: retornoMatche.goalsContra,
      goalsBalance: retornoMatche.balanceamentoDeGoals,
      efficiency: retornoMatche.eficienciaEmCampo,
    };
  });
  return results;
};
export default filterMatches;
