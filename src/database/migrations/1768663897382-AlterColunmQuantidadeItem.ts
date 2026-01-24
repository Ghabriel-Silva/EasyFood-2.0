import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterColunmQuantidadeItem1768663897382 implements MigrationInterface {
    name = 'AlterColunmQuantidadeItem1768663897382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD \`quantity\` decimal(10,3) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD \`quantity\` int NOT NULL`);
    }

}
