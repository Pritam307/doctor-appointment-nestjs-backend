import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { BookAppointmentDto } from 'src/dto/book-appointment.dto';
import { AppointmentService } from './appointment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Appointments')
@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentsService: AppointmentService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ 
        summary: 'Book an appointment',
        description: 'Book a new appointment with a doctor. Requires authentication. The system will check for overlapping appointments and prevent double-booking.'
    })
    @ApiBody({
        type: BookAppointmentDto,
        description: 'Appointment booking data',
        examples: {
            example1: {
                summary: '30-minute appointment',
                value: {
                    doctorId: 'dbc3a50d-d79e-43fc-9a5e-248b8bcfd7ce',
                    patientName: 'John Doe',
                    startTime: '2025-01-15T10:00:00.000Z',
                    endTime: '2025-01-15T10:30:00.000Z'
                }
            }
        }
    })
    @ApiResponse({ 
        status: 201, 
        description: 'Appointment booked successfully',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string', example: 'appointment-id-123' },
                patientName: { type: 'string', example: 'John Doe' },
                startTime: { 
                    type: 'string', 
                    format: 'date-time',
                    example: '2025-01-15T10:00:00.000Z'
                },
                endTime: { 
                    type: 'string', 
                    format: 'date-time',
                    example: '2025-01-15T10:30:00.000Z'
                },
                doctorId: { type: 'string', example: 'dbc3a50d-d79e-43fc-9a5e-248b8bcfd7ce' },
                doctor: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: 'dbc3a50d-d79e-43fc-9a5e-248b8bcfd7ce' },
                        name: { type: 'string', example: 'Dr. John Smith' },
                        specialization: { type: 'string', example: 'Cardiology' }
                    }
                }
            }
        }
    })
    @ApiResponse({ 
        status: 400, 
        description: 'Bad Request - Validation errors or booking conflicts',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 400 },
                message: { 
                    oneOf: [
                        { type: 'string', example: 'End time must be greater than start time' },
                        { type: 'string', example: 'Doctor not found' },
                        { type: 'string', example: 'Doctor is already booked at this time' },
                        { type: 'array', items: { type: 'string' }, example: ['patientName should not be empty'] }
                    ]
                },
                error: { type: 'string', example: 'Bad Request' }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing token' })
    async book(@Body() dto: BookAppointmentDto) {
        return this.appointmentsService.bookAppointment(dto);
    }
}
