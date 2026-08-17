import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { UsersModule } from 'src/users/users.module';
import { DeleteTaskWarningMiddleware } from '../common/middlewares/delete-task-warning.middleware';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
  imports: [UsersModule],
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DeleteTaskWarningMiddleware)
      .forRoutes({ path: 'tasks/:id', method: RequestMethod.DELETE }); // 🎯 SOLO para DELETE /tasks/:id
  }
}

