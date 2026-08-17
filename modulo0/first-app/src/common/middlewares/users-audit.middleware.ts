import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UsersAuditMiddleware implements NestMiddleware {
  private readonly logger = new Logger('UsersAudit');

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`[MIDDLEWARE EN USER CONTROLLER] Petición entrante a la ruta de Usuarios: ${req.method} ${req.originalUrl}`);
    next();
  }
}
