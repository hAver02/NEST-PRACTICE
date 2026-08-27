import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { UUID } from 'crypto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update.user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @Get(':id')
    getUserById(@Param('id', ParseUUIDPipe) id: UUID) {
        return this.usersService.getUserById(id);
    }

    @Post()
    createUser(@Body() user: CreateUserDto) {
        return this.usersService.createUser(user);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseUUIDPipe) id: UUID) {
        return this.usersService.deleteUser(id);
    }

    @Put(':id')
    updateUser(@Param('id', ParseUUIDPipe) id: UUID, @Body() user: UpdateUserDto) {
        return this.usersService.updateUser(id, user);
    }
}
