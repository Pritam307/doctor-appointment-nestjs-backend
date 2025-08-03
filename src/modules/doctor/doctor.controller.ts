import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Param,
  HttpCode,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam, ApiQuery, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { DoctorsService } from './doctor.service';
import { CreateDoctorDto } from 'src/dto/create-doctor.dto';
import { AppointmentService } from '../appointment/appointment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Doctor')
@Controller('doctor')
export class DoctorsController {
  constructor(
    private readonly doctorsService: DoctorsService,
    private readonly appointmentService: AppointmentService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List doctors with optional specialization filtering',
    description: 'Retrieve a list of doctors with optional filtering by specialization. Requires authentication.'
  })
  @ApiQuery({ 
    name: 'specialization', 
    required: false, 
    description: 'Filter doctors by specialization (case-insensitive partial match)',
    example: 'Cardiology'
  })
  @ApiQuery({ 
    name: 'page', 
    required: false, 
    description: 'Page number for pagination',
    example: 1
  })
  @ApiQuery({ 
    name: 'limit', 
    required: false, 
    description: 'Number of doctors per page',
    example: 10
  })
  @ApiResponse({ 
    status: 200, 
    description: 'List of doctors retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'dbc3a50d-d79e-43fc-9a5e-248b8bcfd7ce' },
          name: { type: 'string', example: 'Dr. John Smith' },
          specialization: { type: 'string', example: 'Cardiology' },
          email: { type: 'string', example: 'john.smith@hospital.com' }
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing token' })
  async list(
    @Query('specialization') specialization?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.doctorsService.list(specialization, page, limit);
  }

  @Post()
  @ApiOperation({ 
    summary: 'Register a new doctor',
    description: 'Create a new doctor account. No authentication required.'
  })
  @ApiBody({
    type: CreateDoctorDto,
    description: 'Doctor registration data',
    examples: {
      example1: {
        summary: 'Cardiologist registration',
        value: {
          name: 'Dr. John Smith',
          specialization: 'Cardiology',
          email: 'john.smith@hospital.com'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Doctor created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'dbc3a50d-d79e-43fc-9a5e-248b8bcfd7ce' },
        name: { type: 'string', example: 'Dr. John Smith' },
        specialization: { type: 'string', example: 'Cardiology' },
        email: { type: 'string', example: 'john.smith@hospital.com' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid data provided' })
  async create(@Body() dto: CreateDoctorDto, @Res() res: Response) {
    const doctor = await this.doctorsService.create(dto);
    return res.status(HttpStatus.CREATED).json(doctor);
  }

  @Get(':doctorId/slots')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Get available slots for a doctor on a date',
    description: 'Retrieve available 30-minute time slots for a specific doctor on a given date. Requires authentication.'
  })
  @ApiParam({ 
    name: 'doctorId', 
    description: 'Unique identifier of the doctor',
    example: 'dbc3a50d-d79e-43fc-9a5e-248b8bcfd7ce'
  })
  @ApiQuery({ 
    name: 'date', 
    required: true, 
    description: 'Date in YYYY-MM-DD format',
    example: '2025-01-15'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Available slots retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          startTime: { 
            type: 'string', 
            format: 'date-time',
            example: '2025-01-15T09:00:00.000Z'
          },
          endTime: { 
            type: 'string', 
            format: 'date-time',
            example: '2025-01-15T09:30:00.000Z'
          }
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing token' })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  async availableSlots(
    @Param('doctorId') doctorId: string,
    @Query('date') date: string,
    @Res() res: Response,
  ) {
    const slots = await this.appointmentService.getAvailableSlots(
      doctorId,
      date,
    );
    console.log("dockerID HHH",slots)
    return res.status(HttpStatus.OK).json(slots);
  }
}
