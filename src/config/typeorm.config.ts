import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Doctor } from '../entities/doctor.entity';
import { Appointment } from '../entities/appointment.entity';

// Load environment variables
config();

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Doctor, Appointment],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // Always false for migrations
  logging: process.env.NODE_ENV === 'development',
});
