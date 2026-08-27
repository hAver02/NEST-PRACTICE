import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { randomUUID, UUID } from 'crypto';
import { User } from './user.model';

describe('UsersController', () => {
    let controller: UsersController;
    let service: UsersService;

    const mockUser: User = {
        id: randomUUID(),
        name: 'Luciano',
        email: 'luciano@gmail.com',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: {
                        getUsers: jest.fn().mockReturnValue([mockUser]),
                        getUserById: jest.fn().mockReturnValue(mockUser),
                        createUser: jest.fn().mockReturnValue(mockUser),
                        deleteUser: jest.fn().mockReturnValue('User deleted'),
                        updateUser: jest.fn().mockReturnValue(mockUser),
                    },
                },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getUsers', () => {
        it('should return an array of users', () => {
            expect(controller.getUsers()).toEqual([mockUser]);
            expect(service.getUsers).toHaveBeenCalled();
        });
    });

    describe('getUserById', () => {
        it('should return a user by ID', () => {
            const id: UUID = mockUser.id;
            expect(controller.getUserById(id)).toEqual(mockUser);
            expect(service.getUserById).toHaveBeenCalledWith(id);
        });
    });

    describe('createUser', () => {
        it('should create a new user', () => {
            const dto = { name: 'Luciano', email: 'luciano@gmail.com' };
            expect(controller.createUser(dto)).toEqual(mockUser);
            expect(service.createUser).toHaveBeenCalledWith(dto);
        });
    });

    describe('deleteUser', () => {
        it('should delete a user by ID', () => {
            const id: UUID = mockUser.id;
            expect(controller.deleteUser(id)).toEqual('User deleted');
            expect(service.deleteUser).toHaveBeenCalledWith(id);
        });
    });

    describe('updateUser', () => {
        it('should update a user by ID', () => {
            const id: UUID = mockUser.id;
            const dto = { name: 'Luciano Updated' };
            expect(controller.updateUser(id, dto)).toEqual(mockUser);
            expect(service.updateUser).toHaveBeenCalledWith(id, dto);
        });
    });
});
