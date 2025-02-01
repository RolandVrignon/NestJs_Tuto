# NestJS Tutorial - Task Management API

This tutorial guides you through creating a complete REST API with NestJS, PostgreSQL and TypeORM.

## 📋 Table of Contents
- [Getting Started](#-getting-started)
  - [Prerequisites](#-prerequisites)
  - [Installation](#-installation)
  - [Using Swagger UI](#using-swagger-ui)
  - [First Steps](#first-steps)
- [Project Overview](#-project-overview)
  - [Project Structure](#-project-structure)
  - [Environment Variables](#-environment-variables)
- [NestJS Core Concepts](#-nestjs-core-concepts)
  - [Modules](#modules)
    - [Core Concepts](#core-concepts)
    - [Types of Modules](#types-of-modules)
    - [Module Organization](#module-organization)
    - [Best Practices](#module-best-practices)
    - [Common Patterns](#module-patterns)
  - [Controllers](#controllers)
    - [Request Handlers](#request-handlers)
    - [Request Validation](#request-validation)
    - [Response Handling](#response-handling)
    - [API Documentation](#api-documentation)
    - [Best Practices](#controller-best-practices)
  - [Services](#services)
    - [Core Concepts](#service-core-concepts)
    - [Service Patterns](#service-patterns)
    - [Best Practices](#service-best-practices)
    - [CRUD Operations](#crud-operations)
    - [Business Logic](#business-logic)
  - [Guards](#guards)
    - [Core Concepts](#guard-core-concepts)
    - [Types of Guards](#types-of-guards)
    - [Guard Implementation](#guard-implementation)
    - [Best Practices](#guard-best-practices)
    - [Custom Guards](#custom-guards)
  - [Repositories](#repositories)
    - [TypeORM vs Mongoose](#typeorm-vs-mongoose)
    - [Common Operations](#common-operations)
  - [DTOs](#dtos-data-transfer-objects)
    - [Validation Decorators](#validation-decorators)
    - [Swagger Documentation](#swagger-documentation)
    - [Common DTO Patterns](#common-dto-patterns)
    - [Best Practices](#dto-best-practices)
  - [Entities](#entities)
    - [Entity Relationships](#entity-relationships)
    - [Column Types](#column-types)
- [Features](#-features)
  - [Authentication](#-authentication)
    - [JWT Implementation](#jwt-implementation)
    - [Guards & Security](#guards--security)
  - [Task Management](#-task-management)
  - [User Management](#-user-management)
- [Development](#-development)
  - [Useful Commands](#-useful-commands)
  - [API Documentation](#-api-documentation)
  - [Tests](#-tests)
    - [Unit Tests](#unit-tests)
    - [E2E Tests](#e2e-tests)
- [Additional Information](#-additional-information)
  - [Detailed Documentation](#-detailed-documentation)
  - [Contribution](#-contribution)
  - [License](#-license)
  - [Support](#-support)
  - [Acknowledgments](#-acknowledgments)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- pnpm
- PostgreSQL
- Docker (optional)

### Installation
1. Clone the repository
```bash
git clone https://github.com/RolandVrignon/NestJs_Tuto.git
cd NestJs_Tuto
```

2. Install dependencies
```bash
pnpm install
```

3. Start PostgreSQL (using Docker)
```bash
docker-compose up -d
```

4. Start the application
```bash
pnpm run start:dev
```

### Using Swagger UI
1. Open your browser and navigate to [http://localhost:3000/api](http://localhost:3000/api)
2. You'll see the Swagger UI interface with all available endpoints

### First Steps
1. Create a new user:
   - Expand the `POST /users` endpoint
   - Click "Try it out"
   - Enter your user details:
   ```json
   {
     "email": "your.email@example.com",
     "password": "yourpassword",
     "firstName": "John",
     "lastName": "Doe"
   }
   ```
   - Click "Execute"

2. Login to get your JWT token:
   - Expand the `POST /auth/login` endpoint
   - Click "Try it out"
   - Enter your credentials:
   ```json
   {
     "email": "your.email@example.com",
     "password": "yourpassword"
   }
   ```
   - Click "Execute"
   - Copy the `access_token` from the response

3. Authorize your requests:
   - Click the "Authorize" button at the top of the page
   - Enter your token as: `Bearer your_access_token`
   - Click "Authorize"

## 📝 Project Overview

### Project Structure
```
src/
├── auth/
├── tasks/
├── users/
├── config/
├── app.module.ts
└── main.ts
```

### Environment Variables
```env
PORT=3000
JWT_SECRET=your-secret-key
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=task_management
```

## 🎯 NestJS Core Concepts

### Modules
Modules are the building blocks of NestJS applications. They help organize code into cohesive blocks and manage dependencies.

#### Core Concepts
1. **Module Decorator**
```typescript
@Module({
  imports: [], // Import other modules
  controllers: [], // Register controllers
  providers: [], // Register services and other providers
  exports: [], // Make providers available to other modules
})
```

2. **Real Example: Tasks Module**
```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './controllers/tasks.controller';
import { TasksService } from './services/tasks.service';
import { TasksRepository } from './repositories/tasks.repository';
import { Task } from './entities/task.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UsersModule],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
  exports: [TasksService],
})
export class TasksModule {}
```

#### Types of Modules

1. **Feature Modules**
- Organize code for specific features
- Example: TasksModule, UsersModule
- Encapsulate related functionality

2. **Core Module**
- Contains singleton services
- Shared across entire application
- Example: DatabaseModule, LoggerModule

3. **Shared Modules**
- Reusable modules
- Exported providers
- Example: UtilsModule

#### Module Organization

1. **Root Module (AppModule)**
```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    UsersModule,
    AuthModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```

2. **Feature Module Structure**
```plaintext
users/
├── controllers/
│   └── users.controller.ts
├── services/
│   └── users.service.ts
├── dto/
│   ├── create-user.dto.ts
│   └── update-user.dto.ts
├── entities/
│   └── user.entity.ts
└── users.module.ts
```

#### Module Best Practices

1. **Dependency Management**
```typescript
@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Database entities
    JwtModule.register({              // External module configuration
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
```

2. **Provider Registration**
```typescript
@Module({
  providers: [
    UsersService,
    {
      provide: 'CONFIG',
      useValue: { apiUrl: 'http://api.example.com' }
    },
    {
      provide: 'LOGGER',
      useClass: CustomLogger
    }
  ],
})
```

3. **Module Exports**
```typescript
@Module({
  exports: [
    UsersService,       // Export specific provider
    AuthGuard,         // Export guard
    TypeOrmModule,     // Re-export imported module
  ],
})
```

#### Common Module Patterns

1. **Dynamic Modules**
```typescript
@Module({})
export class ConfigModule {
  static register(options: ConfigOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
```

2. **Global Modules**
```typescript
@Global()
@Module({
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {}
```

#### Module Features

1. **Encapsulation**
- Providers are scoped to their module
- Must be explicitly exported to be used elsewhere
- Creates clear boundaries

2. **Dependency Injection**
- Automatic dependency resolution
- Circular dependency handling
- Provider scope management

3. **Module Re-exporting**
```typescript
@Module({
  imports: [CommonModule],
  exports: [CommonModule], // Re-export entire module
})
```

#### Testing Modules

```typescript
describe('UsersModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
```

#### Benefits
1. **Organization**: Clear code structure
2. **Reusability**: Modular components
3. **Maintainability**: Separation of concerns
4. **Testability**: Isolated testing
5. **Scalability**: Easy to add new features
6. **Dependency Management**: Clear dependencies

### Controllers
Controllers handle incoming HTTP requests and return responses. They are the entry point for all API requests in NestJS.

#### Core Concepts
1. **Controller Decorators**
```typescript
@Controller('users')        // Base route prefix
@ApiTags('users')          // Swagger documentation
@ApiBearerAuth()          // JWT authentication
```

2. **Real Example: Tasks Controller**
```typescript
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
```

#### Request Handlers

1. **HTTP Methods**
```typescript
@Get()                    // GET request
@Post()                   // POST request
@Patch(':id')            // PATCH request
@Delete(':id')           // DELETE request
```

2. **Route Parameters**
```typescript
@Get(':id')
findOne(@Param('id') id: string) {
  return this.service.findOne(+id);
}
```

3. **Request Body**
```typescript
@Post()
create(@Body() createUserDto: CreateUserDto) {
  return this.service.create(createUserDto);
}
```

#### Request Validation

1. **DTOs and Validation**
```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Do shopping' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Buy a gray T-shirt.' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
```

2. **Guards**
```typescript
@UseGuards(AuthGuard)
@Get('profile')
getProfile(@Request() req) {
  return req.user;
}
```

#### Response Handling

1. **Status Codes**
```typescript
@Post()
@HttpCode(HttpStatus.CREATED)
create() {
  return 'Created';
}
```

2. **Response Transformation**
```typescript
@Get()
@UseInterceptors(ClassSerializerInterceptor)
findAll() {
  return this.service.findAll();
}
```

#### API Documentation

1. **Swagger Decorators**
```typescript
@ApiOperation({ summary: 'Create a new user' })
@ApiResponse({ status: 201, description: 'User created successfully.' })
@ApiResponse({ status: 400, description: 'Bad Request.' })
```

#### Best Practices

1. **Dependency Injection**
```typescript
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
```