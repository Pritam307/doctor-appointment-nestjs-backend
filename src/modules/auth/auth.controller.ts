import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from 'src/dto/login-dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ 
    summary: 'Login to get JWT token',
    description: 'Authenticate with username and password to receive a JWT token for accessing protected endpoints.'
  })
  @ApiBody({
    type: LoginDto,
    description: 'Login credentials',
    examples: {
      example1: {
        summary: 'Admin login',
        value: {
          username: 'admin',
          password: 'password'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Login successful',
    schema: {
      type: 'object',
      properties: {
        access_token: { 
          type: 'string', 
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMSIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3NTQyMzA4ODEsImV4cCI6MTc1NDIzNDQ4MX0.vOw6RysdTY2NUYJChMtv2nNoyAQi-1Rb4CBJ_GOBAwE'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid credentials',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Unauthorized' }
      }
    }
  })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.username, body.password);
  }
}
