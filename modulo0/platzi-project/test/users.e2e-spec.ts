import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UsersController (e2e)', () => {
    let app: INestApplication;
    let createdUserId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true,
            }),
        );
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/users (GET)', () => {
        return request(app.getHttpServer())
            .get('/users')
            .expect(200)
            .expect((res) => {
                expect(Array.isArray(res.body)).toBe(true);
                expect(res.body.length).toBeGreaterThan(0);
            });
    });

    it('/users (POST) - create new user', () => {
        return request(app.getHttpServer())
            .post('/users')
            .send({ name: 'Carlos', email: 'carlos@gmail.com' })
            .expect(201)
            .expect((res) => {
                expect(res.body).toHaveProperty('id');
                expect(res.body.name).toBe('Carlos');
                expect(res.body.email).toBe('carlos@gmail.com');
                createdUserId = res.body.id;
            });
    });

    it('/users/:id (GET) - get created user by ID', () => {
        return request(app.getHttpServer())
            .get(`/users/${createdUserId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.id).toBe(createdUserId);
                expect(res.body.name).toBe('Carlos');
            });
    });

    it('/users/:id (PUT) - update user', () => {
        return request(app.getHttpServer())
            .put(`/users/${createdUserId}`)
            .send({ name: 'Carlos Updated' })
            .expect(200)
            .expect((res) => {
                expect(res.body.name).toBe('Carlos Updated');
            });
    });

    it('/users/:id (DELETE) - delete user', () => {
        return request(app.getHttpServer()).delete(`/users/${createdUserId}`).expect(200).expect('User deleted');
    });

    it('/users/:id (GET) - non-existing user should return 404', () => {
        const fakeUuid = '00000000-0000-0000-0000-000000000000';
        return request(app.getHttpServer()).get(`/users/${fakeUuid}`).expect(404);
    });
});
