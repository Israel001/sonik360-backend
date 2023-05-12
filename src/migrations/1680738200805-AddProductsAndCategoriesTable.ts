import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductsAndCategoriesTable1680738200805 implements MigrationInterface {
    name = 'AddProductsAndCategoriesTable1680738200805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`products\` (\`created_at\` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`name\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`brand\` varchar(255) NOT NULL, \`availability\` int NOT NULL, \`colors\` varchar(255) NOT NULL, \`attributes\` longtext NOT NULL, \`type\` varchar(255) NOT NULL, \`category_id\` int NULL, PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sub_categories\` (\`created_at\` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`main_category_id\` int NULL, UNIQUE INDEX \`IDX_8c775c80f1ab54eb9a211ef0b2\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`main_categories\` (\`created_at\` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, UNIQUE INDEX \`IDX_9c82ec8e7aeebffb32f79b5759\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_9a5f6868c96e0069e699f33e124\` FOREIGN KEY (\`category_id\`) REFERENCES \`sub_categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sub_categories\` ADD CONSTRAINT \`FK_983e9e4557905013353e9118a52\` FOREIGN KEY (\`main_category_id\`) REFERENCES \`main_categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sub_categories\` DROP FOREIGN KEY \`FK_983e9e4557905013353e9118a52\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_9a5f6868c96e0069e699f33e124\``);
        await queryRunner.query(`DROP INDEX \`IDX_9c82ec8e7aeebffb32f79b5759\` ON \`main_categories\``);
        await queryRunner.query(`DROP TABLE \`main_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_8c775c80f1ab54eb9a211ef0b2\` ON \`sub_categories\``);
        await queryRunner.query(`DROP TABLE \`sub_categories\``);
        await queryRunner.query(`DROP TABLE \`products\``);
    }

}
