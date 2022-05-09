import { Request, Response, NextFunction } from 'express';

const sameTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    return res.status(401).json({
      message: 'It is not possible to create a match with two equal teams' });
  }
  next();
};

export const dontExistTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam > 16 || awayTeam > 16) {
    return res.status(404).json({
      message: 'There is no team with such id!' });
  }
  next();
};

export default sameTeam;
