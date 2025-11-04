import { Request, Response, Router } from "express";
import Controller from "../types/controller";

class HealthController implements Controller {
  public path = "/api";
  public router = Router();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.get("/health", this.health);
  }
  private health = async (_request: Request, response: Response): Promise<void> => {
    response.json({
      ok: true,
      service: "server",
      ts: new Date().toISOString(),
    });
  };
}

export default HealthController;
