import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';
import { UpdateTaskDto as UpdateTaskDtoTask } from '../tasks/dto/update-task.dto';
import { Task, TaskStatus } from '../tasks/entities/task.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: crypto.randomUUID(),
      email: createUserDto.email,
      password: createUserDto.password,
      dni: createUserDto.dni,
      isActive: createUserDto.isActive ?? true,
      tasks: [],
    };

    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    Object.assign(user, updateUserDto);
    return user;
  }

  remove(id: string) {
    this.findOne(id);
    this.users = this.users.filter(u => u.id !== id);
  }

  addTask(userId: string, taskDto: CreateTaskDto): Task {
    const user = this.findOne(userId);
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskDto.title,
      description: taskDto.description,
      status: taskDto.status ?? TaskStatus.PENDING,
    };
    user.tasks.push(newTask);
    return newTask;
  }

  findTasksByUser(userId: string): Task[] {
    const user = this.findOne(userId);
    return user.tasks;
  }

  updateUserTask(userId: string, taskId: string, updateTaskDto: UpdateTaskDtoTask): Task {
    const user = this.findOne(userId);
    const task = user.tasks.find(t => t.id === taskId);
    if (!task) {
      throw new NotFoundException(`Task with id ${taskId} not found for user ${userId}`);
    }
    Object.assign(task, updateTaskDto);
    return task;
  }

  deleteUserTask(userId: string, taskId: string) {
    const user = this.findOne(userId);
    const taskIndex = user.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with id ${taskId} not found for user ${userId}`);
    }
    user.tasks.splice(taskIndex, 1);
  }
}

