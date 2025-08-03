<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# Doctor Appointment Booking API

A comprehensive REST API for managing doctor appointments and scheduling built with NestJS, TypeORM, and PostgreSQL.

## 🚀 Features

- **Doctor Management**: Register and list doctors with specializations
- **Appointment Booking**: Book appointments with conflict detection
- **Available Slots**: Get available time slots for doctors
- **JWT Authentication**: Secure API with JWT token-based authentication
- **Swagger Documentation**: Interactive API documentation
- **Validation**: Comprehensive input validation and error handling

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd doctor-appointment-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/appointments

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=1h

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 4. Database Setup

#### Option A: Using Docker (Recommended)

```bash
# Start PostgreSQL container
docker run --name postgres-appointments \
  -e POSTGRES_DB=appointments \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:15

# Update your .env file
DATABASE_URL=postgresql://postgres:password@localhost:5432/appointments
```

#### Option B: Local PostgreSQL

1. Install PostgreSQL on your system
2. Create a database:
   ```sql
   CREATE DATABASE appointments;
   ```
3. Update the `DATABASE_URL` in your `.env` file

### 6. Database Migrations

#### Development (Auto-synchronization)
For development, the database schema is automatically created:
```bash
npm run start:dev
```

#### Production (Migrations)
For production, use migrations to manage database schema:

```bash
# Run initial migration
npm run migration:run

# Generate new migration (when you change entities)
npm run migration:generate -- src/migrations/NewMigrationName

# Revert last migration
npm run migration:revert
```

### 7. Run the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

### Interactive Swagger UI

Access the interactive API documentation at: `http://localhost:3000/api`

### Authentication

Most endpoints require JWT authentication. To get a token:

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password"
  }'
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Use this token in the Authorization header: `Authorization: Bearer YOUR_TOKEN_HERE`

## 🔌 API Endpoints

### Authentication

#### POST /auth/login
Login to get JWT token (no authentication required)

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password"
  }'
```

### Doctors

#### POST /doctor
Register a new doctor (no authentication required)

```bash
curl -X POST http://localhost:3000/doctor \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. John Smith",
    "specialization": "Cardiology",
    "email": "john.smith@hospital.com"
  }'
```

#### GET /doctor
List doctors with optional filtering (requires authentication)

```bash
curl -X GET "http://localhost:3000/doctor?specialization=Cardiology&page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### GET /doctor/{doctorId}/slots
Get available time slots for a doctor on a specific date (requires authentication)

```bash
curl -X GET "http://localhost:3000/doctor/dbc3a50d-d79e-43fc-9a5e-248b8bcfd7ce/slots?date=2025-01-15" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Appointments

#### POST /appointment
Book an appointment (requires authentication)

```bash
curl -X POST http://localhost:3000/appointment \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "doctorId": "dbc3a50d-d79e-43fc-9a5e-248b8bcfd7ce",
    "patientName": "John Doe",
    "startTime": "2025-01-15T10:00:00.000Z",
    "endTime": "2025-01-15T10:30:00.000Z"
  }'
```

## 🏗️ Project Structure

```
src/
├── modules/
│   ├── app/                 # Main application module
│   ├── auth/               # Authentication module
│   ├── doctor/             # Doctor management module
│   └── appointment/        # Appointment booking module
├── entities/               # TypeORM entities
├── dto/                   # Data Transfer Objects
├── config/                # Configuration files
├── migrations/            # Database migrations
└── main.ts                # Application entry point
```

## 🗄️ Database Schema

### Tables

#### Doctor Table
```sql
CREATE TABLE doctor (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    specialization VARCHAR NOT NULL,
    bio VARCHAR,
    createdAt TIMESTAMP DEFAULT NOW()
);
```

#### Appointment Table
```sql
CREATE TABLE appointment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patientName VARCHAR NOT NULL,
    startTime TIMESTAMPTZ NOT NULL,
    endTime TIMESTAMPTZ NOT NULL,
    doctorId UUID NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (doctorId) REFERENCES doctor(id) ON DELETE CASCADE
);
```

### Indexes
- `IDX_appointment_doctorId`: For efficient doctor-specific queries
- `IDX_appointment_times`: For efficient overlap detection
- `IDX_appointment_doctor_date`: For date range queries by doctor

### Relationships
- **Doctor** → **Appointment**: One-to-Many (one doctor can have many appointments)
- **Appointment** → **Doctor**: Many-to-One (each appointment belongs to one doctor)

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Comprehensive validation using class-validator
- **SQL Injection Protection**: TypeORM query builder prevents SQL injection
- **CORS Protection**: Built-in CORS protection
- **Rate Limiting**: Can be easily added with @nestjs/throttler

## 🧪 Business Rules

### Appointment Booking Rules
1. **No Double Booking**: A doctor cannot be booked for overlapping time slots
2. **Valid Time Range**: End time must be greater than start time
3. **Working Hours**: Appointments are only available between 9:00 AM and 5:00 PM
4. **30-Minute Slots**: Appointments are scheduled in 30-minute increments

### Available Slots Logic
- Generates 30-minute slots from 9:00 AM to 5:00 PM
- Excludes slots that overlap with existing appointments
- Returns only available time slots for the specified date

## 🐛 Error Handling

The API provides detailed error messages for various scenarios:

- **400 Bad Request**: Validation errors, booking conflicts, invalid time ranges
- **401 Unauthorized**: Invalid or missing authentication token
- **404 Not Found**: Doctor not found
- **500 Internal Server Error**: Server-side errors

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run test coverage
npm run test:cov
```

## 📦 Available Scripts

```bash
# Development
npm run start:dev          # Start in development mode with hot reload
npm run start:debug        # Start in debug mode
npm run start:prod         # Start in production mode

# Building
npm run build              # Build the application
npm run build:webpack      # Build with webpack

# Testing
npm run test               # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:cov           # Run tests with coverage
npm run test:debug         # Run tests in debug mode
npm run test:e2e           # Run e2e tests

# Linting
npm run lint               # Run ESLint
npm run lint:fix           # Fix ESLint issues
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DATABASE_URL` | PostgreSQL connection string | - | Yes |
| `JWT_SECRET` | Secret key for JWT signing | - | Yes |
| `JWT_EXPIRES_IN` | JWT token expiration time | `1h` | No |
| `PORT` | Server port | `3000` | No |
| `NODE_ENV` | Environment mode | `development` | No |

### Database Configuration

The application uses TypeORM with PostgreSQL. Key features:
- **Auto-synchronization**: Database schema is automatically created in development
- **Migrations**: Can be added for production deployments
- **Connection pooling**: Optimized database connections

## 🚀 Deployment

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
```

### Environment-Specific Configurations

#### Development
- Auto-synchronization enabled
- Detailed error messages
- Hot reload enabled

#### Production
- Disable auto-synchronization
- Use database migrations
- Enable compression and security headers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation at `http://localhost:3000/api`
- Review the error logs for debugging information

## 🔄 Version History

- **v1.0.0**: Initial release with basic appointment booking functionality
- Features: JWT authentication, doctor management, appointment booking, available slots
