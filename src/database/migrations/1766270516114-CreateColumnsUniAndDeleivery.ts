import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateColumnsUniAndDeleivery1766270516114 implements MigrationInterface {
    name = 'CreateColumnsUniAndDeleivery1766270516114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`delivery_method\` enum ('delivery', 'pickup', 'dine_in') NOT NULL DEFAULT 'delivery'`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`uni_medida\` enum ('kg', 'g', 'l', 'un', 'porcao', 'fatia', 'pedaco', 'combo', 'none') NOT NULL DEFAULT 'none'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`uniMedida\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`delivery_method\``);
    }

}
