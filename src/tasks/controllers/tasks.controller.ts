import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { AuthGuard } from '../../users/guards/auth.guard';
import { RequestWithUser } from '../../auth/interfaces/request.interface';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task successfully created.' })
  @UseGuards(AuthGuard)
  create(
    @Request() req: RequestWithUser,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(req.user.id, createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks for current user' })
  @UseGuards(AuthGuard)
  findAll(@Request() req: RequestWithUser) {
    return this.tasksService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one task' })
  @UseGuards(AuthGuard)
  findOne(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.tasksService.findOne(+id, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @UseGuards(AuthGuard)
  remove(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.tasksService.remove(+id, req.user.id);
  }
}
