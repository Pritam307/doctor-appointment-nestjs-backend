import { IsString, IsNotEmpty, IsUUID, IsISO8601 } from 'class-validator';

export class BookAppointmentDto {
  @IsUUID()
  doctorId: string;

  @IsString()
  @IsNotEmpty()
  patientName: string;

  @IsISO8601()
  startTime: string; // ISO string, will parse to Date

  @IsISO8601()
  endTime: string;
}
