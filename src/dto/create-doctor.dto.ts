import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  specialization: string;

  @IsOptional()
  @IsString()
  bio?: string;
}
