import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1678069770118 implements MigrationInterface {
    name = 'InitialMigration1678069770118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`created_at\` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`id\` int NOT NULL AUTO_INCREMENT, \`firstname\` varchar(50) NOT NULL, \`lastname\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`phone\` varchar(15) NOT NULL, \`password\` varchar(255) NOT NULL, \`address\` varchar(200) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
