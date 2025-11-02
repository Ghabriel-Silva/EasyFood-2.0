import { MigrationInterface, QueryRunner } from "typeorm";

export class EditeTablesCompanyOrder1762120085785 implements MigrationInterface {
    name = 'EditeTablesCompanyOrder1762120085785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`paymentMethod\` enum ('Dinheiro', 'Cartão', 'Pix', 'Outros') NOT NULL DEFAULT 'Outros'`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`isFreightApplied\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`customFreight\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`totalFreight\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`additionalValue\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`discountValue\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD \`defaultFreight\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`status\` \`status\` enum ('Pendente', 'Preparando', 'Completo', 'Entregue', 'Cancelado') NOT NULL DEFAULT 'Pendente'`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_9a5f6868c96e0069e699f33e124\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`category_id\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`category_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_9a5f6868c96e0069e699f33e124\` FOREIGN KEY (\`category_id\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_9a5f6868c96e0069e699f33e124\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`category_id\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`category_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_9a5f6868c96e0069e699f33e124\` FOREIGN KEY (\`category_id\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`status\` \`status\` enum ('PENDING', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE \`company\` DROP COLUMN \`defaultFreight\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`discountValue\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`additionalValue\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`totalFreight\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`customFreight\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`isFreightApplied\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`paymentMethod\``);
    }

}
