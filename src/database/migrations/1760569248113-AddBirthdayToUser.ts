import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBirthdayToUser1760569248113 implements MigrationInterface {
    name = 'AddBirthdayToUser1760569248113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`birthday\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`role\` \`role\` enum ('admin', 'user') NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`role\` \`role\` enum ('master', 'junior') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`birthday\``);
    }

}
