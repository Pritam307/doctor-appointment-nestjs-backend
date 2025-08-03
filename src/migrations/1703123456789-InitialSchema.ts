import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1703123456789 implements MigrationInterface {
    name = 'InitialSchema1703123456789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create doctor table
        await queryRunner.query(`
            CREATE TABLE "doctor" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "specialization" character varying NOT NULL,
                "bio" character varying,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_doctor" PRIMARY KEY ("id")
            )
        `);

        // Create appointment table
        await queryRunner.query(`
            CREATE TABLE "appointment" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "patientName" character varying NOT NULL,
                "startTime" TIMESTAMP WITH TIME ZONE NOT NULL,
                "endTime" TIMESTAMP WITH TIME ZONE NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "doctorId" uuid NOT NULL,
                CONSTRAINT "PK_appointment" PRIMARY KEY ("id")
            )
        `);

        // Create index for doctorId to speed up overlap checks
        await queryRunner.query(`
            CREATE INDEX "IDX_appointment_doctorId" ON "appointment" ("doctorId")
        `);

        // Create foreign key constraint
        await queryRunner.query(`
            ALTER TABLE "appointment" 
            ADD CONSTRAINT "FK_appointment_doctor" 
            FOREIGN KEY ("doctorId") 
            REFERENCES "doctor"("id") 
            ON DELETE CASCADE 
            ON UPDATE NO ACTION
        `);

        // Create index for startTime and endTime for efficient overlap queries
        await queryRunner.query(`
            CREATE INDEX "IDX_appointment_times" ON "appointment" ("startTime", "endTime")
        `);

        // Create index for doctorId + date range queries
        await queryRunner.query(`
            CREATE INDEX "IDX_appointment_doctor_date" ON "appointment" ("doctorId", "startTime")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraint
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_appointment_doctor"`);
        
        // Drop indexes
        await queryRunner.query(`DROP INDEX "IDX_appointment_doctor_date"`);
        await queryRunner.query(`DROP INDEX "IDX_appointment_times"`);
        await queryRunner.query(`DROP INDEX "IDX_appointment_doctorId"`);
        
        // Drop tables
        await queryRunner.query(`DROP TABLE "appointment"`);
        await queryRunner.query(`DROP TABLE "doctor"`);
    }
} 