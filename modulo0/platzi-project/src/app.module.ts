import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Env } from './env.models';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        UsersModule,
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService<Env>) => ({
                type: 'postgres',
                host: configService.get('POSTGRES_HOST', { infer: true }),
                port: Number(configService.get('POSTGRES_PORT', { infer: true })),
                username: configService.get('POSTGRES_USER', { infer: true }),
                password: configService.get('POSTGRES_PASSWORD', { infer: true }),
                database: configService.get('POSTGRES_DB', { infer: true }),
                autoLoadEntities: true,
                synchronize: true,
            }),
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
