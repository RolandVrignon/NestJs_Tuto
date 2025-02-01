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
  - [Controllers](#controllers)
  - [Services](#services)
  - [Repositories](#repositories)
  - [DTOs](#dtos-data-transfer-objects)
  - [Guards](#guards)
  - [Entities](#entities)
- [Features](#-features)
  - [Authentication](#-authentication)
  - [Task Management](#-task-management)
  - [User Management](#-user-management)
- [Development](#-development)
  - [Useful Commands](#-useful-commands)
  - [API Documentation](#-api-documentation)
  - [Tests](#-tests)
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

### DTOs (Data Transfer Objects)
DTOs define the shape of data being transferred between client and server. They:
- Validate incoming data using decorators
- Document API parameters with Swagger
- Provide type safety
- Separate validation from business logic

Example DTO:
```typescript
@ApiProperty({ example: 'user@example.com' })
@IsEmail()
@IsString()
email: string;
```

### Guards
Guards determine whether a request should be handled by the route handler. They:
- Handle authentication/authorization
- Protect routes
- Validate tokens
- Inject user information into requests

### Entities
Entities are classes that map to database tables. They:
- Use decorators to define table structure
- Handle relationships between tables
- Manage data validation
- Enable automatic migrations

## 🔥 Features

### Authentication
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- User registration and login

### Task Management
- Create, read, update, delete tasks
- Filter and search tasks
- Task ownership and access control

### User Management
- User registration
- Profile management
- Password encryption
- Email validation

## 🛠 Development

### Useful Commands
```bash
# Development
pnpm run start:dev

# Testing
pnpm run test
pnpm run test:e2e

# Production build
pnpm run build
pnpm run start:prod
```

### API Documentation
- Swagger UI available at `/api`
- Detailed endpoint documentation
- Request/response examples
- Authentication documentation

### Tests
- Unit tests with Jest
- E2E tests with Supertest
- Test coverage reports

## ℹ️ Additional Information

### Detailed Documentation
For more detailed documentation, please refer to:
- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)

### Contribution
Contributions are welcome! Please read our contributing guidelines.

### License
This project is licensed under the MIT License.

### Support
For support, please open an issue in the repository.

### Acknowledgments
- NestJS team
- TypeORM contributors
- Open source community
