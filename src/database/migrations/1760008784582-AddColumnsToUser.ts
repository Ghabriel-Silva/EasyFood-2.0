import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnsToUser1760008784582 implements MigrationInterface {
    name = 'AddColumnsToUser1760008784582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`gender\` enum ('homem', 'mulher', 'outro') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`aniversario\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`foto\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`name\` varchar(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`name\` varchar(30) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`foto\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`aniversario\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` enum ('MASTER', 'JUNIOR') NOT NULL DEFAULT 'JUNIOR'`);
    }

}
