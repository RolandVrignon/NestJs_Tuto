# NestJS Tutorial - Task Management API

This tutorial guides you through creating a complete REST API with NestJS, PostgreSQL and TypeORM.

![Complete Flow](/assets/complete-flow.png)

## �� Table of Contents
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Using Swagger UI](#using-swagger-ui)
  - [First Steps](#first-steps)
- [Project Overview](#-project-overview)
  - [Project Structure](#project-structure)
  - [Environment Variables](#environment-variables)
- [NestJS Core Concepts](#-nestjs-core-concepts)
  - [Modules](#modules)
    - [Core Concepts](#core-concepts)
    - [Types of Modules](#types-of-modules)
    - [Module Organization](#module-organization)
    - [Module Best Practices](#module-best-practices)
    - [Common Module Patterns](#common-module-patterns)
  - [Controllers](#controllers)
    - [Core Concepts](#controller-core-concepts)
    - [Request Handlers](#request-handlers)
    - [Request Validation](#request-validation)
    - [Response Handling](#response-handling)
    - [API Documentation](#api-documentation)
    - [Best Practices](#best-practices)
    - [Common Patterns](#common-patterns)
  - [Services](#services)
    - [Core Concepts](#service-core-concepts)
    - [Service Patterns](#service-patterns)
    - [Best Practices](#service-best-practices)
  - [Guards](#guards)
    - [Core Concepts](#guard-core-concepts)
    - [Guard Implementation](#guard-implementation)
    - [Types of Guards](#types-of-guards)
    - [Best Practices](#guard-best-practices)
    - [Benefits](#benefits)
  - [Repositories](#repositories)
    - [Core Concepts](#repository-core-concepts)
    - [TypeORM vs Mongoose](#typeorm-vs-mongoose)
    - [Common Operations](#common-operations)
  - [DTOs (Data Transfer Objects)](#dtos-data-transfer-objects)
    - [Purpose](#purpose)
    - [Key Features](#key-features)
    - [Common DTO Patterns](#common-dto-patterns)
    - [Best Practices](#dto-best-practices)
    - [Benefits](#dto-benefits)
  - [Entities](#entities)
    - [Entity Relationships](#entity-relationships)
    - [Key Features](#entity-key-features)
- [Features](#-features)
  - [Authentication](#authentication)
  - [Task Management](#task-management)
  - [User Management](#user-management)
- [Development](#-development)
  - [Useful Commands](#useful-commands)
  - [API Documentation](#-api-documentation)
  - [Tests](#tests)
- [Additional Information](#-additional-information)
  - [Detailed Documentation](#detailed-documentation)
  - [Contribution](#contribution)
  - [License](#license)
  - [Support](#support)
  - [Acknowledgments](#acknowledgments)

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

### Services
Services handle business logic and data operations. They are the core of the application and are responsible for managing data and business rules.

#### Core Concepts
1. **Service Decorator**
```typescript
@Injectable()
export class UsersService {
  // ...
}
```

2. **Real Example: Tasks Service**
```typescript
import { Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from '../repositories/tasks.repository';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  // ...
}
```

#### Service Patterns

1. **Service Implementation**
```typescript
import { Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from '../repositories/tasks.repository';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  // ...
}
```

#### Best Practices

1. **Service Implementation**
```typescript
import { Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from '../repositories/tasks.repository';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  // ...
}
```

#### CRUD Operations

1. **Create**
```typescript
import { Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from '../repositories/tasks.repository';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  // ...
}
```

2. **Read**
```typescript
import { Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from '../repositories/tasks.repository';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  // ...
}
```

3. **Update**
```typescript
import { Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from '../repositories/tasks.repository';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  // ...
}
```

4. **Delete**
```typescript
import { Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from '../repositories/tasks.repository';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  // ...
}
```

#### Business Logic

1. **Business Logic Implementation**
```typescript
import { Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from '../repositories/tasks.repository';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  // ...
}
```

### Guards
Guards are used to protect routes and ensure that only authorized users can access them. They are a crucial part of the security system in NestJS.

#### Core Concepts
1. **Guard Decorator**
```typescript
@Injectable()
export class AuthGuard {
  // ...
}
```

2. **Real Example: AuthGuard**
```typescript
import { Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from '../repositories/tasks.repository';
import { Task } from '../entities/task.entity';

@Injectable()
export class AuthGuard {
  // ...
}
```

#### Types of Guards

1. **AuthGuard**
- Protects routes from unauthorized access
- Example: AuthGuard

2. **RoleGuard**
- Restricts access based on user roles
- Example: RoleGuard

3. **PermissionGuard**
- Restricts access based on user permissions
- Example: PermissionGuard

#### Guard Implementation

1. **Guard Implementation**
```typescript
import { Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from '../repositories/tasks.repository';
import { Task } from '../entities/task.entity';

@Injectable()
export class AuthGuard {
  // ...
}
```

#### Best Practices

1. **Guard Implementation**
```typescript
import { Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from '../repositories/tasks.repository';
import { Task } from '../entities/task.entity';

@Injectable()
export class AuthGuard {
  // ...
}
```

#### Custom Guards

1. **Custom Guard Implementation**
```typescript
import { Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from '../repositories/tasks.repository';
import { Task } from '../entities/task.entity';

@Injectable()
export class CustomGuard {
  // ...
}
```

### Repositories
Repositories handle data operations and interact with the database. They are a crucial part of the application and are responsible for managing data access.

#### Core Concepts
1. **Repository Decorator**
```typescript
@Injectable()
export class TasksRepository {
  // ...
}
```

2. **Real Example: Tasks Repository**
```typescript
import { Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksRepository {
  // ...
}
```

#### TypeORM vs Mongoose

1. **TypeORM**
- SQL database ORM
- Supports multiple databases
- Active community
- Strongly typed

2. **Mongoose**
- MongoDB ORM
- Supports NoSQL databases
- Flexible schema
- Active community

#### Common Operations

1. **Find**
```typescript
import { Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from '../repositories/tasks.repository';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksRepository {
  // ...
}
```

2. **Create**
```typescript
import { Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from '../repositories/tasks.repository';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksRepository {
  // ...
}
```

3. **Update**
```typescript
import { Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from '../repositories/tasks.repository';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksRepository {
  // ...
}
```

4. **Delete**
```typescript
import { Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from '../repositories/tasks.repository';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksRepository {
  // ...
}
```

### DTOs (Data Transfer Objects)
DTOs are used to transfer data between different parts of the application. They are a crucial part of the application and are responsible for managing data transfer.

#### Purpose
1. **Data Transfer**
- Transfer data between different parts of the application
- Example: TaskDto, UserDto

2. **Validation**
- Validate data before processing
- Example: CreateTaskDto, UpdateTaskDto

#### Key Features

1. **DTO Decorators**
```typescript
@ApiProperty()
@IsNotEmpty()
@IsString()
title: string;

@ApiProperty()
@IsNotEmpty()
@IsString()
description: string;
```

2. **DTO Validation**
```typescript
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
```

#### Common DTO Patterns

1. **DTO Implementation**
```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Do shopping' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Buy a gray T-shirt.' })
  @IsNotEmpty()
  @IsString()
  description: string;
}
```

2. **DTO Validation**
```typescript
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
```

#### Best Practices

1. **DTO Implementation**
```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Do shopping' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Buy a gray T-shirt.' })
  @IsNotEmpty()
  @IsString()
  description: string;
}
```

2. **DTO Validation**
```typescript
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
```

#### Benefits
1. **Data Transfer**: Clear and consistent data format
2. **Validation**: Ensure data integrity
3. **Consistency**: Uniform data representation
4. **Reusability**: Reusable across different parts of the application

### Entities
Entities represent the structure of the database tables. They are a crucial part of the application and are responsible for managing data access.

#### Entity Relationships

1. **One-to-Many Relationship**
```typescript
import { Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Task {
  @ManyToOne(() => User, user => user.tasks)
  user: User;
}
```

2. **Many-to-Many Relationship**
```typescript
import { Entity, ManyToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Task {
  @ManyToMany(() => User, user => user.tasks)
  users: User[];
}
```

#### Column Types

1. **Primary Key**
```typescript
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
}
```

2. **Foreign Key**
```typescript
import { Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Task {
  @ManyToOne(() => User, user => user.tasks)
  user: User;
}
```

3. **Unique Key**
```typescript
import { Entity, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
export class User {
  // ...
}
```

4. **Nullable Key**
```typescript
import { Entity, Column } from 'typeorm';

@Entity()
export class Task {
  @Column({ nullable: true })
  description: string;
}
```

## 🎯 Features

### Authentication
Authentication is the process of verifying the identity of a user or service. It is a crucial part of the application and is responsible for managing user access.

#### JWT Implementation
1. **JWT Decorator**
```typescript
@Injectable()
export class AuthService {
  // ...
}
```

2. **JWT Implementation**
```typescript
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // ...
}
```

#### Guards & Security
1. **AuthGuard**
- Protects routes from unauthorized access
- Example: AuthGuard

2. **RoleGuard**
- Restricts access based on user roles
- Example: RoleGuard

3. **PermissionGuard**
- Restricts access based on user permissions
- Example: PermissionGuard

### Task Management
Task management is the process of managing tasks. It is a crucial part of the application and is responsible for managing task access.

### User Management
User management is the process of managing users. It is a crucial part of the application and is responsible for managing user access.

## 🎯 Development

### Useful Commands
1. **Start the application**
```bash
pnpm run start:dev
```

2. **Stop the application**
```bash
pnpm run stop
```

3. **Build the application**
```bash
pnpm run build
```

### API Documentation
1. **Swagger UI**
- Open your browser and navigate to [http://localhost:3000/api](http://localhost:3000/api)
- You'll see the Swagger UI interface with all available endpoints

### Tests

#### Unit Tests
1. **Run unit tests**
```bash
pnpm run test:unit
```

#### E2E Tests
1. **Run E2E tests**
```bash
pnpm run test:e2e
```

## 🎯 Additional Information

### Detailed Documentation
1. **Swagger Documentation**
- Open your browser and navigate to [http://localhost:3000/api](http://localhost:3000/api)
- You'll see the Swagger UI interface with all available endpoints

2. **Swagger Decorators**
```typescript
@ApiOperation({ summary: 'Create a new user' })
@ApiResponse({ status: 201, description: 'User created successfully.' })
@ApiResponse({ status: 400, description: 'Bad Request.' })
```

### Contribution
1. **Contribution Guidelines**
- Fork the repository
- Create a new branch
- Make your changes
- Commit your changes
- Push your changes
- Create a pull request

### License
1. **License**
- This project is licensed under the MIT License

### Support
1. **Support**
- For support, please open an issue on the GitHub repository

### Acknowledgments
1. **Acknowledgments**
- Thanks to the NestJS community for their support and contributions