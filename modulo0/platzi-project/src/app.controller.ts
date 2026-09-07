import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { User } from './users/user.model';
import { ConfigService } from '@nestjs/config';
import { Env } from './env.models';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly usersService: UsersService,
        private readonly configService: ConfigService<Env>
    ) { }

    @Get()
    getHello(): string {
        console.log('Connected DB:', this.configService.get('POSTGRES_DB', { infer: true }));
        return this.appService.getHello();
    }

    @Get('my-test')
    getUser(): User[] {
        return this.usersService.getUsers();
    }
}
