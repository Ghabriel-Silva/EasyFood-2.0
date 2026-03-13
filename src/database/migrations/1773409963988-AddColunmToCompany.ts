import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColunmToCompany1773409963988 implements MigrationInterface {
    name = 'AddColunmToCompany1773409963988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company\` ADD \`customerAddress\` varchar(60) NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD \`customerPhone\` varchar(20) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company\` DROP COLUMN \`customerPhone\``);
        await queryRunner.query(`ALTER TABLE \`company\` DROP COLUMN \`customerAddress\``);
    }

}
