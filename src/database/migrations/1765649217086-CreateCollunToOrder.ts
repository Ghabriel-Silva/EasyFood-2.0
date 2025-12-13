import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCollunToOrder1765649217086 implements MigrationInterface {
    name = 'CreateCollunToOrder1765649217086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`observations\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`observations\``);
    }

}
