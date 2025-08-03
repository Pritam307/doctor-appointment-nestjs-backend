import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  const config = new DocumentBuilder()
    .setTitle('Doctor Appointment Booking API')
    .setDescription(`
      A comprehensive API for managing doctor appointments and scheduling.
      
      ## Authentication
      Most endpoints require authentication using JWT Bearer tokens. To authenticate:
      1. Use the POST /auth/login endpoint with username: 'admin' and password: 'password'
      2. Copy the access_token from the response
      3. Click the "Authorize" button at the top of this page and enter: Bearer YOUR_TOKEN_HERE
      4. Or include the Authorization header in your requests: Authorization: Bearer YOUR_TOKEN_HERE
      
      ## Protected Endpoints
      - GET /doctor - List doctors (requires auth)
      - GET /doctor/{doctorId}/slots - Get available slots (requires auth)
      - POST /appointment - Book appointment (requires auth)
      
      ## Public Endpoints
      - POST /auth/login - Login to get token
      - POST /doctor - Register new doctor
    `)
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for references
    )
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, doc);


  await app.listen(process.env.PORT || 3000);
}
bootstrap();
