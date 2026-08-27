import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID, UUID } from 'crypto';
import { User } from './user.model';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update.user.dto';

@Injectable()
export class UsersService {
    private users: User[] = [{ id: randomUUID(), name: 'Luciano', email: 'luciano@gmail.com' }];

    getUsers(): User[] {
        return this.users;
    }

    getUserById(id: UUID): User {
        const user = this.users.find((user) => user.id === id);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    createUser(userDto: CreateUserDto): User {
        const userExist = this.users.find((user) => user.email === userDto.email);
        if (userExist) throw new ConflictException('User already exists');

        const newUser: User = { id: randomUUID(), ...userDto };
        this.users.push(newUser);
        return newUser;
    }

    deleteUser(id: UUID): string {
        const userIndex = this.users.findIndex((user) => user.id === id);
        if (userIndex === -1) throw new NotFoundException('User not found');
        this.users.splice(userIndex, 1);
        return 'User deleted';
    }

    updateUser(id: UUID, userDto: UpdateUserDto): User {
        const userFound = this.getUserById(id);
        Object.assign(userFound, userDto);
        return userFound;
    }
}
