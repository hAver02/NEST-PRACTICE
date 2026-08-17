import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class DeleteTaskWarningMiddleware implements NestMiddleware {
  private readonly logger = new Logger('DeleteTaskWarning');

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.warn(`[MIDDLEWARE EN ENDPOINT EXCLUSIVO DELETE /tasks/:id] Warning: Solicitud de eliminación en proceso para la ruta ${req.originalUrl}`);
    next();
  }
}
