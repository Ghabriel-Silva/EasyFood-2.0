import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterColunmQuantity1772232083432 implements MigrationInterface {
    name = 'AlterColunmQuantity1772232083432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`quantity\` decimal(12,3) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`quantity\` int NULL`);
    }

}
