import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersAuditMiddleware } from '../common/middlewares/users-audit.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UsersAuditMiddleware)
      .forRoutes(UsersController); // 👈 Aplicado EXCLUSIVAMENTE a las rutas de UsersController
  }
}

