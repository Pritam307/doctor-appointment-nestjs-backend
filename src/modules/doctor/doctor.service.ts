import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDoctorDto } from 'src/dto/create-doctor.dto';
import { Doctor } from 'src/entities/doctor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,
  ) {}

  async create(dto: CreateDoctorDto): Promise<Doctor> {
    const doctor = this.doctorRepo.create(dto);
    try {
      return await this.doctorRepo.save(doctor);
    } catch (e) {
      // could inspect e.code for unique constraint etc.
      throw new BadRequestException(`Failed to register doctor:${e.message}`);
    }
  }

  async list(specialization?: string, page = 1, limit = 10): Promise<Doctor[]> {
    const qb = this.doctorRepo.createQueryBuilder('d');
    if (specialization) {
      qb.where('d.specialization ILIKE :spec', { spec: `%${specialization}%` });
    }
    qb.skip((page - 1) * limit).take(limit);
    return qb.getMany();
  }
}
