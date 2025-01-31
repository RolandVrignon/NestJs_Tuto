import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async findByUserId(userId: number): Promise<Task[]> {
    return this.find({
      where: { userId },
      relations: ['user'],
    });
  }
}
