import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSpecialCategoriesTable1685127527810 implements MigrationInterface {
    name = 'AddSpecialCategoriesTable1685127527810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`special_categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`products\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_7fa3a7979bbf51427fd6b55a9c\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_7fa3a7979bbf51427fd6b55a9c\` ON \`special_categories\``);
        await queryRunner.query(`DROP TABLE \`special_categories\``);
    }

}
