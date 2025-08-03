import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    Index,
  } from 'typeorm';
  import { Doctor } from './doctor.entity';
  
  @Entity()
  export class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    patientName: string;
  
    @ManyToOne(() => Doctor, { eager: true })
    doctor: Doctor;
  
    @Column('timestamptz')
    startTime: Date;
  
    @Column('timestamptz')
    endTime: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    //index to speed up overlap checks
    @Index()
    @Column()
    doctorId: string;
  }
  