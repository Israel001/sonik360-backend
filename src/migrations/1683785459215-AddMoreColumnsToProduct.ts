import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMoreColumnsToProduct1683785459215 implements MigrationInterface {
    name = 'AddMoreColumnsToProduct1683785459215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`reviews\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`short_description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`original_price\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`discount\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_9a5f6868c96e0069e699f33e124\``);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`created_at\` \`created_at\` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`updated_at\` \`updated_at\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`slug\` \`slug\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`category_id\` \`category_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_9a5f6868c96e0069e699f33e124\` FOREIGN KEY (\`category_id\`) REFERENCES \`sub_categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_9a5f6868c96e0069e699f33e124\``);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`category_id\` \`category_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`slug\` \`slug\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`updated_at\` \`updated_at\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`created_at\` \`created_at\` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_9a5f6868c96e0069e699f33e124\` FOREIGN KEY (\`category_id\`) REFERENCES \`sub_categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`discount\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`original_price\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`short_description\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`reviews\``);
    }

}
