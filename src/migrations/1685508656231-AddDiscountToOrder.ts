import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDiscountToOrder1685508656231 implements MigrationInterface {
    name = 'AddDiscountToOrder1685508656231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`discount\` float NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`date_completed\` \`date_completed\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`details\` \`details\` longtext NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`details\` \`details\` longtext NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`date_completed\` \`date_completed\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`discount\``);
    }

}
