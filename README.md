# NestJS Tutorial - Task Management API

This tutorial guides you through creating a complete REST API with NestJS, PostgreSQL and TypeORM.

## 📋 Table of Contents
- [Tutorial Objectives](#-tutorial-objectives)
- [NestJS Core Concepts](#-nestjs-core-concepts)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Tutorial Steps](#-tutorial-steps)
- [Authentication](#-authentication)
- [Useful Commands](#-useful-commands)
- [API Documentation](#-api-documentation)
- [Tests](#-tests)
- [Detailed Documentation](#-detailed-documentation)
- [Environment Variables](#-environment-variables)
- [Contribution](#-contribution)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)
- [Support](#-support)

## 🎯 Tutorial Objectives

- Understand NestJS architecture
- Implement a complete REST API
- Use TypeORM with PostgreSQL
- Handle authentication and authorization
- Set up automated testing

## 🎯 NestJS Core Concepts

### Modules
Modules are used to organize the application structure. Each module encapsulates a closely related set of capabilities. Modules are decorated with `@Module()`.

### Controllers
Controllers handle incoming requests and return responses. They are decorated with `@Controller()` and handle specific routes.

### Services
Services contain the business logic. They are injectable classes (decorated with `@Injectable()`) that can be shared across multiple parts of your application.

### Repositories
Repositories are classes that handle database operations for specific entities. In NestJS with TypeORM:

- They extend `Repository<Entity>` from TypeORM
- Automatically inherit CRUD operations (find, findOne, save, remove, etc.)
- Allow custom database queries and operations
- Are injectable in services using `@InjectRepository()`

Example:
```typescript
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  // Inherits: find(), findOne(), save(), remove(), etc.
  
  // Custom methods
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const query = this.createQueryBuilder('task');
    // ... custom query logic
    return await query.getMany();
  }
}
```

### Dependency Injection
NestJS uses dependency injection to manage dependencies between components. This is a design pattern where dependencies are "injected" into a class rather than created inside it.

#### Basic Dependency Injection
```typescript
// user.service.ts
@Injectable()
export class UserService {
  private users = [];
  
  async findOne(id: number) {
    return this.users.find(user => user.id === id);
  }
}

// user.controller.ts
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService // NestJS automatically injects the service
  ) {}

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userService.findOne(id);
  }
}
```

#### Repository Injection
```typescript
// user.repository.ts
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    const user = this.create({ email, password });
    return await this.save(user);
  }
}

// user.service.ts
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
  }
}
```

#### Multiple Dependencies
```typescript
// task.service.ts
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const maxTasks = this.configService.get('MAX_TASKS_PER_USER');
    const userTasks = await this.taskRepository.count({ where: { userId: user.id } });

    if (userTasks >= maxTasks) {
      throw new BadRequestException('Maximum tasks limit reached');
    }

    const task = this.taskRepository.create({
      ...createTaskDto,
      user,
    });

    return await this.taskRepository.save(task);
  }
}
```

#### Custom Providers
```typescript
// logger.service.ts
@Injectable()
export class LoggerService {
  log(message: string) {
    console.log(`[${new Date().toISOString()}] ${message}`);
  }
}

// app.module.ts
@Module({
  providers: [
    // Custom provider with useClass
    {
      provide: 'LOGGER',
      useClass: LoggerService,
    },
    // Custom provider with useValue
    {
      provide: 'API_KEY',
      useValue: process.env.API_KEY,
    },
    // Custom provider with useFactory
    {
      provide: 'DATABASE_CONFIG',
      useFactory: (configService: ConfigService) => ({
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
      }),
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}

// Using custom providers
@Injectable()
export class SomeService {
  constructor(
    @Inject('LOGGER') private logger: LoggerService,
    @Inject('API_KEY') private apiKey: string,
    @Inject('DATABASE_CONFIG') private dbConfig: DatabaseConfig,
  ) {}
}
```

These examples demonstrate:
- Basic constructor injection
- Repository injection with TypeORM
- Multiple dependency injection
- Custom providers with different injection strategies
- Using environment variables and configuration
- Proper error handling
- Type safety with TypeScript

## 📚 Prerequisites

- Node.js (v14+)
- pnpm (v8+)
- Docker (for PostgreSQL)
- Basic TypeScript knowledge
- Familiarity with REST APIs

## 🚀 Installation

```bash
# Install pnpm if not installed
npm install -g pnpm

# Clone the repository
git clone https://github.com/RolandVrignon/NestJs_Tuto.git

# Install dependencies
pnpm install
pnpm add @nestjs/swagger swagger-ui-express
pnpm add -D @types/node @types/express @types/jest @types/bcrypt @types/passport-jwt

# Launch database
docker-compose up -d

# Launch application in development
pnpm run start:dev
```

## 📖 Project Structure

```bash
src/
├── users/              # User management module
├── auth/              # JWT authentication module
├── tasks/             # Task management module
├── config/           # Application configuration
└── app.module.ts     # Root module
```

## 🛠️ Tutorial Steps

1. **Initial Setup** ✅
   - NestJS installation
   - PostgreSQL configuration with Docker
   - TypeORM configuration

2. **Users Module** ✅
   - Complete CRUD
   - Data validation
   - Password hashing
   - Unit tests

3. **Authentication** ✅
   - JWT (JSON Web Tokens)
   - Login endpoint
   - Route protection
   - Authentication tests

4. **Tasks Module** ✅
   - Complete CRUD operations
   - User relationships
   - Filters and pagination
   - Status management
   - Integration tests

## 🔐 Authentication

### Endpoints

```bash
POST /auth/login
```

Payload:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### Route Protection

Use the `@UseGuards(AuthGuard)` decorator to protect your routes:

```typescript
@UseGuards(AuthGuard)
@Get('profile')
getProfile() {
  // Protected route
}
```

## 📝 Useful Commands

```bash
# Dependencies installation
pnpm install
pnpm add @nestjs/jwt @nestjs/swagger swagger-ui-express
pnpm add -D @types/node @types/express @types/jest @types/bcrypt @types/passport-jwt

# Development
pnpm run start:dev

# Tests
pnpm run test
pnpm run test:e2e
pnpm run test:cov

# Build
pnpm run build

# Production
pnpm run start:prod
```

## 🔍 API Documentation

Swagger documentation is available at:
```
http://localhost:3000/api
```

Available endpoints:
- POST `/users` - Create user
- POST `/auth/login` - Authentication
- GET `/users/:id` - User details (protected)
- PATCH `/users/:id` - Update user (protected)
- DELETE `/users/:id` - Delete user (protected)
- GET `/tasks` - Get all tasks (protected)
- POST `/tasks` - Create task (protected)
- GET `/tasks/:id` - Get task details (protected)
- PATCH `/tasks/:id` - Update task (protected)
- DELETE `/tasks/:id` - Delete task (protected)

## 🧪 Tests

```bash
# Unit tests
pnpm run test

# E2E tests
pnpm run test:e2e

# Code coverage
pnpm run test:cov
```

## 📚 Detailed Documentation

- [Users Module](/src/users/Readme.md)
- [Tasks Module](/src/tasks/Readme.md)
- [Auth Module](/src/auth/Readme.md)

## 🔐 Environment Variables

Create a `.env` file at the root:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=task_management
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=1d
```

## 🤝 Contribution

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [Jest Documentation](https://jestjs.io/)

## 🤔 Support

For any questions or issues:
- Open an issue
- Check the [NestJS documentation](https://docs.nestjs.com/)
- Join the [NestJS Discord](https://discord.gg/nestjs)
