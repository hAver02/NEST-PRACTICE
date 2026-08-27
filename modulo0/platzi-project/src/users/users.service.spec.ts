import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

describe('UsersService', () => {
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersService],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getUsers', () => {
        it('should return an array of users', () => {
            const users = service.getUsers();
            expect(Array.isArray(users)).toBe(true);
            expect(users.length).toBeGreaterThan(0);
            expect(users[0]).toHaveProperty('id');
            expect(users[0]).toHaveProperty('name');
            expect(users[0]).toHaveProperty('email');
        });
    });

    describe('getUserById', () => {
        it('should return a user if found', () => {
            const initialUser = service.getUsers()[0];
            const foundUser = service.getUserById(initialUser.id);
            expect(foundUser).toEqual(initialUser);
        });

        it('should throw NotFoundException if user is not found', () => {
            const fakeId = randomUUID();
            expect(() => service.getUserById(fakeId)).toThrow(NotFoundException);
        });
    });

    describe('createUser', () => {
        it('should create and return a new user', () => {
            const newUserDto = { name: 'Maria', email: 'maria@gmail.com' };
            const createdUser = service.createUser(newUserDto);

            expect(createdUser).toHaveProperty('id');
            expect(createdUser.name).toBe(newUserDto.name);
            expect(createdUser.email).toBe(newUserDto.email);

            const users = service.getUsers();
            expect(users.find((u) => u.id === createdUser.id)).toBeDefined();
        });

        it('should throw ConflictException if user with same email exists', () => {
            const initialUser = service.getUsers()[0];
            expect(() => service.createUser({ name: 'Another Name', email: initialUser.email })).toThrow(ConflictException);
        });
    });

    describe('updateUser', () => {
        it('should update and return the user', () => {
            const initialUser = service.getUsers()[0];
            const updatedUser = service.updateUser(initialUser.id, { name: 'Luciano Updated' });

            expect(updatedUser.name).toBe('Luciano Updated');
            expect(updatedUser.email).toBe(initialUser.email);
        });

        it('should throw NotFoundException when updating non-existing user', () => {
            const fakeId = randomUUID();
            expect(() => service.updateUser(fakeId, { name: 'Test' })).toThrow(NotFoundException);
        });
    });

    describe('deleteUser', () => {
        it('should delete user and return success message', () => {
            const initialUser = service.getUsers()[0];
            const result = service.deleteUser(initialUser.id);

            expect(result).toBe('User deleted');
            expect(() => service.getUserById(initialUser.id)).toThrow(NotFoundException);
        });

        it('should throw NotFoundException when deleting non-existing user', () => {
            const fakeId = randomUUID();
            expect(() => service.deleteUser(fakeId)).toThrow(NotFoundException);
        });
    });
});
