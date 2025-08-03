import { BadRequestException, Injectable } from '@nestjs/common';
import { Appointment } from 'src/entities/appointment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/entities/doctor.entity';
import { BookAppointmentDto } from 'src/dto/book-appointment.dto';
@Injectable()
export class AppointmentService {
    constructor(
        @InjectRepository(Appointment)
        private readonly appointmentRepo: Repository<Appointment>,
        @InjectRepository(Doctor)
        private readonly doctorRepo: Repository<Doctor>
    ){}


    async bookAppointment(dto: BookAppointmentDto):Promise<Appointment>{
        const {doctorId, patientName, startTime, endTime} = dto;
        const start = new Date(startTime);
        const end = new Date(endTime);

        if(end < start){
            throw new BadRequestException('End time must be greater than start time');
        }

        const doctor  = await this.doctorRepo.findOneBy({
            id: doctorId
        });

        if(!doctor){
            throw new BadRequestException('Doctor not found');
        }
        
        const overlappingAppointment = await this.appointmentRepo.createQueryBuilder('appointment')
        .where('appointment.doctorId = :doctorId', {doctorId})
        .andWhere('((appointment.startTime < :end AND appointment.endTime > :start))', {end: end.toISOString(), start: start.toISOString()})
        .getCount();

        if(overlappingAppointment > 0){
            throw new BadRequestException('Doctor is already booked at this time');
        }
        
        const appointment = this.appointmentRepo.create({
            patientName,
            doctor,
            startTime: start,
            endTime: end,
            doctorId: doctor.id
        })

        return this.appointmentRepo.save(appointment);
    }


    async list(doctorId?: string, page = 1, limit = 10) {
        const qb = this.appointmentRepo.createQueryBuilder('a');
        if (doctorId) {
          qb.where('a.doctorId = :doctorId', { doctorId });
        }
        qb.orderBy('a.startTime', 'ASC')
          .skip((page - 1) * limit)
          .take(limit);
        return qb.getMany();
    }

    async getAvailableSlots(doctorId:string,date:string){
        try{
            const dayStart = new Date(`${date}T09:00:00.000Z`);
            const dayEnd = new Date(`${date}T17:00:00.000Z`);

            console.log(`Looking for slots for doctor ${doctorId} on ${date}`);
            console.log(`Day start: ${dayStart.toISOString()}`);
            console.log(`Day end: ${dayEnd.toISOString()}`);

            // Fetch appointments only for the specific date and doctor
            const existingAppointments = await this.appointmentRepo.createQueryBuilder('appointment')
                .where('appointment.doctorId = :doctorId', { doctorId })
                .andWhere('appointment.startTime >= :dayStart', { dayStart: dayStart.toISOString() })
                .andWhere('appointment.endTime <= :dayEnd', { dayEnd: dayEnd.toISOString() })
                .getMany();

            console.log(`Found ${existingAppointments.length} existing appointments for this date:`);
            existingAppointments.forEach(apt => {
                console.log(`- ${apt.startTime} to ${apt.endTime} for ${apt.patientName}`);
            });

            // generate 30-min slots
            const slots: { start: Date; end: Date }[] = [];
            let current = dayStart;

            while(current < dayEnd){
                const slotEnd = new Date(current.getTime() + 30 * 60000);
                if (slotEnd > dayEnd) break;
                 // check overlap with any existing appointment
                const overlaps = existingAppointments.some(a =>
                    (current < a.endTime && slotEnd > a.startTime)
                );
                if (!overlaps) {
                    slots.push({ start: new Date(current), end: slotEnd });
                }
                current = slotEnd;
            }


            return slots.map(s => ({
                startTime: s.start.toISOString(),
                endTime: s.end.toISOString(),
            }));
        }catch(error){
            throw new Error(`Failed to get available slots: ${error.message}`);
        }
    }

      
}


