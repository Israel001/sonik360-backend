import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSlugToProductsTable1683609593207 implements MigrationInterface {
    name = 'AddSlugToProductsTable1683609593207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`slug\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD UNIQUE INDEX \`IDX_464f927ae360106b783ed0b410\` (\`slug\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP INDEX \`IDX_464f927ae360106b783ed0b410\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`slug\``);
    }

}
