import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TasksRepository } from '../repositories/tasks.repository';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class TasksService {
  constructor(
    private tasksRepository: TasksRepository,
    private usersService: UsersService,
  ) {}

  async create(userId: number, createTaskDto: CreateTaskDto) {
    const user = await this.usersService.findOne(userId);

    const task = this.tasksRepository.create({
      ...createTaskDto,
      userId: user.id,
    });

    return this.tasksRepository.save(task);
  }

  async findAll(userId: number) {
    return this.tasksRepository.findByUserId(userId);
  }

  async findOne(id: number, userId: number) {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }

    if (task.userId !== userId) {
      throw new ForbiddenException('You can only access your own tasks');
    }

    return task;
  }

  async remove(id: number, userId: number) {
    const task = await this.findOne(id, userId);
    return this.tasksRepository.remove(task);
  }
}
