import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnCategory1763381016818 implements MigrationInterface {
    name = 'AddColumnCategory1763381016818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`status\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`status\``);
    }

}
