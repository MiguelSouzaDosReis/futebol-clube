import * as express from 'express';
import * as cors from 'cors';

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
      res.send('felicidade');
    });
  }
}
export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
