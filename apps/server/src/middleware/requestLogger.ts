import morgan from "morgan";
import winston from "winston";
import { RequestHandler } from "express";

class Logger {
  private winstonLogger: winston.Logger;
  private httpLogger: RequestHandler;

  constructor() {
    this.winstonLogger = this.createWinstonLogger();
    
    // Create morgan middleware that uses the winston logger
    this.httpLogger = morgan("tiny", {
      stream: {
        write: (message) => this.winstonLogger.http(message.trim()),
      },
    });
  }

  // Helper method to create winston logger configuration
  private createWinstonLogger(context?: string): winston.Logger {
    const format = context
      ? winston.format.printf(
          ({ timestamp, level, message }) =>
            `[${timestamp}] ${level} [${context}]: ${message}`
        )
      : winston.format.printf(
          ({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`
        );

    return winston.createLogger({
      level: process.env.LOG_LEVEL || "http",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        format
      ),
      transports: [new winston.transports.Console()],
    });
  }

  // Get the HTTP request logger middleware
  public getHttpLogger(): RequestHandler {
    return this.httpLogger;
  }

  // Create a context-specific logger
  public createContextLogger(context: string): winston.Logger {
    return this.createWinstonLogger(context);
  }

  // Direct logging methods using the main logger
  public info(message: string): void {
    this.winstonLogger.info(message);
  }

  public error(message: string, error?: Error): void {
    this.winstonLogger.error(message, error);
  }

  public warn(message: string): void {
    this.winstonLogger.warn(message);
  }

  public debug(message: string): void {
    this.winstonLogger.debug(message);
  }

  public http(message: string): void {
    this.winstonLogger.http(message);
  }
}

// Export a singleton instance
export const logger = new Logger();

// Export the class for creating custom instances if needed
export default Logger;
