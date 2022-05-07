import * as express from 'express';
import * as cors from 'cors';
import createLogin from './controller/login';
import validEmail, { validToken } from './middleware/login';
import everthingTeams, { everthingIdTeams } from './controller/teams';
import everthingMatches from './controller/matches';

class App {
  public app: express.Express;
  // ...

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(cors());
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(
      `Server is running on PORT: ${PORT}`,
    ));
  }

  public routes():void {
    this.app.get('/', (_req, res) => {
      res.send('esá fucionando !');
    });
    this.app.post('/login', validEmail, createLogin);
    this.app.get('/login/validate', validToken);
    this.app.get('/teams', everthingTeams);
    this.app.get('/teams/:id', everthingIdTeams);
    this.app.get('/matches', everthingMatches);
  }
}
export { App };
// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
