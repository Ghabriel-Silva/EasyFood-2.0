import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCollumOrderItem1762491862341 implements MigrationInterface {
    name = 'AddCollumOrderItem1762491862341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD \`name\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP COLUMN \`name\``);
    }

}
