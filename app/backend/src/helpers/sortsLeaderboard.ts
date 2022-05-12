interface Ileadbord {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories:number,
  totalDraws:number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
}

const ordemOwn = (a: Ileadbord, b: Ileadbord) => {
  if (a.goalsOwn > b.goalsOwn) {
    return 1;
  }
  if (b.goalsOwn > a.goalsOwn) {
    return -1;
  }
  return 0;
};
const ordemFavor = (a: Ileadbord, b: Ileadbord) => {
  if (a.goalsFavor > b.goalsFavor) {
    return -1;
  }
  if (b.goalsFavor > a.goalsFavor) {
    return 1;
  }
  return ordemOwn(a, b);
};
const ordemBalance = (a: Ileadbord, b: Ileadbord) => {
  if (a.goalsBalance > b.goalsBalance) {
    return -1;
  }
  if (b.goalsBalance > a.goalsBalance) {
    return 1;
  }
  return ordemFavor(a, b);
};

const ordemVictories = (a: Ileadbord, b: Ileadbord) => {
  if (a.totalVictories > b.totalVictories) {
    return -1;
  }
  if (b.totalVictories > a.totalVictories) {
    return 1;
  }
  return ordemBalance(a, b);
};

const sortLeaderboard = (leaderboard: Ileadbord[]) => {
  const ordem = leaderboard.sort((a: Ileadbord, b: Ileadbord): any => {
    if (a.totalPoints > b.totalPoints) {
      return -1;
    }
    if (b.totalPoints > a.totalPoints) {
      return 1;
    }
    return ordemVictories(a, b);
  });
  return ordem;
};
export default sortLeaderboard;
