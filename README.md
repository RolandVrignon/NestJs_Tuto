# NestJS Tutorial - Task Management API

This tutorial guides you through creating a complete REST API with NestJS, PostgreSQL and TypeORM.

## 🎯 Tutorial Objectives

- Understand NestJS architecture
- Implement a complete REST API
- Use TypeORM with PostgreSQL
- Handle authentication and authorization
- Set up automated testing

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
