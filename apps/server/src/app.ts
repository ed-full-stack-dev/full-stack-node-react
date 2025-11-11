import express from "express";
import { ALLOWED_ORIGINS } from "./config/env";
import cors from "cors";
import Controller from "./types/controller";
import {logger} from "./middleware/requestLogger";
class App {
  private logger = logger.createContextLogger('App')
  public app: express.Application;
  public port: number;
  constructor(port: number, controllers: Controller[]) {
    this.app = express();
    this.port = port;
    this.init(controllers);
  }
  private  init(controllers: Controller[]) {
    try {
      this.initializeMiddleWare();
      this.initializeCORS();
      this.initializeControllers(controllers);
    } catch (error) {
      console.error("Error during initialization", error);
      process.exit(1);
    }
  }
  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.router);
    });
  }
  private initializeMiddleWare() {
    this.app.use(logger.getHttpLogger())
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  private initializeCORS() {
    const corsOptions = {
      origin: (
        origin: string | undefined,
        callback: (err: Error | null, allow?: boolean) => void
      ) => {
        if (!origin || ALLOWED_ORIGINS.includes(origin)) {
          callback(null, true);
        } else {
          this.logger.warn(`CORS blocked request from origin:${origin}`);
          callback(null, false);
        }
      },
      methods: ["GET", "POST", "PATCH", "DELETE"],
      credentials: true,
    };
    this.app.use(cors(corsOptions));
  }
  public listen():void {
    this.app.listen(this.port, () => {
        this.logger.info(`API listening on http://localhost:${this.port}`)
    })
  }
}

export default App;
