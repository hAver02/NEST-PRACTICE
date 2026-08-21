import { BadRequestException, Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { randomUUID, UUID } from 'crypto';
import { User } from './user.model';


@Controller('users')
export class UsersController {

    private users: User[] = [{ id: randomUUID(), name: 'Luciano', email: 'luciano@gmail.com' }]


    @Get()
    getUsers() {
        return this.users
    }

    @Get(':id')
    getUserById(@Param('id', ParseUUIDPipe) id: UUID) {
        const user = this.users.find(user => user.id === id)
        if (!user) throw new NotFoundException("User not found")
        return user
    }

    @Post()
    createUser(@Body() user: CreateUserDto) {
        const userExist = this.users.find(us => user.email === us.email);
        if (userExist) throw new ConflictException("User already exists");

        const newUser: User = { id: randomUUID(), ...user };
        this.users.push(newUser);
        return newUser;
    }


    @Delete(':id')
    deleteUser(@Param("id", ParseUUIDPipe) id: UUID) {
        const userIndex = this.users.findIndex(user => user.id === id)
        if (userIndex == -1) throw new NotFoundException("User not found")
        this.users.splice(userIndex, 1)
        return "User deleted"
    }

    @Put(':id')
    updateUser(@Param('id',) id: UUID, @Body() user: Partial<User>) {
        const userFound: User = this.getUserById(id)
        Object.assign(userFound, user)
        return userFound
    }
}
