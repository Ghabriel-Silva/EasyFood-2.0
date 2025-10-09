import { MigrationInterface, QueryRunner } from "typeorm";

export class EditeTableUser1760051817279 implements MigrationInterface {
    name = 'EditeTableUser1760051817279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`aniversario\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`foto\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`lastLoginAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` enum ('master', 'junior') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`lastLoginAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`gender\` enum ('homem', 'mulher', 'outro') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`foto\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`aniversario\` date NULL`);
    }

}
