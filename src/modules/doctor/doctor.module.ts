import { Module } from '@nestjs/common';
import { DoctorsController } from './doctor.controller';
import { DoctorsService } from './doctor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from 'src/entities/doctor.entity';
import { AppointmentModule } from '../appointment/appointment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor]), AppointmentModule],
  providers: [DoctorsService],
  controllers: [DoctorsController],
})
export class DoctorModule {}
