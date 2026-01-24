import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateColumCategory1768401103923 implements MigrationInterface {
    name = 'CreateColumCategory1768401103923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`is_default\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`is_default\``);
    }

}
