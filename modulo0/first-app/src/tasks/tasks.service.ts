import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './entities/task.entity';

@Injectable()
export class TasksService {

  private tasks: Task[] = [];

  create(dto: CreateTaskDto) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: dto.title,
      description: dto.description,
      status: dto.status ?? TaskStatus.PENDING
    }
    this.tasks.push(newTask);
    return newTask
  }

  findAll(status?: TaskStatus) {
    if (status) return this.tasks.filter(t => t.status === status);
    return this.tasks;
  }

  findOne(id: string) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    return task;
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = this.findOne(id);
    Object.assign(task, updateTaskDto)
    return task
  }

  remove(id: string) {
    const task = this.findOne(id);

    this.tasks = this.tasks.filter(t => t.id !== id)
    return true
  }
}

