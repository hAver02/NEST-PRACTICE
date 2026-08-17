import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
 import { CreateUserDto } from './dto/create-user.dto';
 import { UpdateUserDto } from './dto/update-user.dto';
 import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
 import { UpdateTaskDto as UpdateTaskDtoTask } from 'src/tasks/dto/update-task.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }

  @Post(':userId/tasks')
  @HttpCode(HttpStatus.CREATED)
  addTask(@Param('userId', ParseUUIDPipe) userId: string, @Body() taskDto: CreateTaskDto) {
    return this.usersService.addTask(userId, taskDto);
  }

  @Get(':userId/tasks')
  findTaskByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.usersService.findTasksByUser(userId);
  }

  @Patch(':userId/tasks/:taskId')
  updateTask(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Body() updateTaskDto: UpdateTaskDtoTask,
  ) {
    return this.usersService.updateUserTask(userId, taskId, updateTaskDto);
  }

  @Delete(':userId/tasks/:taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTask(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    return this.usersService.deleteUserTask(userId, taskId);
  }
}

