import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateMigration1688584009356 implements MigrationInterface {
  name = 'UpdateMigration1688584009356';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(
    //   `DROP INDEX \`FK_9a5f6868c96e0069e699f33e124\` ON \`products\``,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE \`products\` ADD \`name\` varchar(255) NOT NULL PRIMARY KEY`,
    // );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`created_at\` \`created_at\` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`updated_at\` \`updated_at\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`slug\` \`slug\` varchar(255) NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`image\``);
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`image\` longtext NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`reviews\``);
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`reviews\` longtext NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP COLUMN \`short_description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`short_description\` longtext NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`brand\``);
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`brand\` longtext NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`colors\``);
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`colors\` longtext NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`type\``);
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`type\` longtext NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`category_id\` \`category_id\` int NULL`,
    );
    // await queryRunner.query(
    //   `ALTER TABLE \`sub_categories\` DROP FOREIGN KEY \`FK_983e9e4557905013353e9118a52\``,
    // );
    await queryRunner.query(
      `ALTER TABLE \`sub_categories\` CHANGE \`created_at\` \`created_at\` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_categories\` CHANGE \`updated_at\` \`updated_at\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_categories\` DROP COLUMN \`brands\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_categories\` ADD \`brands\` longtext NOT NULL`,
    );
    // await queryRunner.query(
    //   `DROP INDEX \`IDX_8c775c80f1ab54eb9a211ef0b2\` ON \`sub_categories\``,
    // );
    await queryRunner.query(
      `ALTER TABLE \`sub_categories\` DROP COLUMN \`name\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_categories\` ADD \`name\` varchar(255) NOT NULL`,
    );
    // await queryRunner.query(
    //   `ALTER TABLE \`sub_categories\` ADD UNIQUE INDEX \`IDX_8c775c80f1ab54eb9a211ef0b2\` (\`name\`)`,
    // );
    await queryRunner.query(
      `ALTER TABLE \`sub_categories\` CHANGE \`main_category_id\` \`main_category_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`main_categories\` CHANGE \`created_at\` \`created_at\` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`main_categories\` CHANGE \`updated_at\` \`updated_at\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    // await queryRunner.query(
    //   `DROP INDEX \`IDX_9c82ec8e7aeebffb32f79b5759\` ON \`main_categories\``,
    // );
    await queryRunner.query(
      `ALTER TABLE \`main_categories\` DROP COLUMN \`name\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`main_categories\` ADD \`name\` varchar(255) NOT NULL`,
    );
    // await queryRunner.query(
    //   `ALTER TABLE \`main_categories\` ADD UNIQUE INDEX \`IDX_9c82ec8e7aeebffb32f79b5759\` (\`name\`)`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_9a5f6868c96e0069e699f33e124\` FOREIGN KEY (\`category_id\`) REFERENCES \`sub_categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE \`sub_categories\` ADD CONSTRAINT \`FK_983e9e4557905013353e9118a52\` FOREIGN KEY (\`main_category_id\`) REFERENCES \`main_categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sub_categories\` DROP FOREIGN KEY \`FK_983e9e4557905013353e9118a52\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_9a5f6868c96e0069e699f33e124\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`main_categories\` DROP INDEX \`IDX_9c82ec8e7aeebffb32f79b5759\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`main_categories\` DROP COLUMN \`name\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`main_categories\` ADD \`name\` varchar(50) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_9c82ec8e7aeebffb32f79b5759\` ON \`main_categories\` (\`name\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`main_categories\` CHANGE \`updated_at\` \`updated_at\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`main_categories\` CHANGE \`created_at\` \`created_at\` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_categories\` CHANGE \`main_category_id\` \`main_category_id\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_categories\` DROP INDEX \`IDX_8c775c80f1ab54eb9a211ef0b2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_categories\` DROP COLUMN \`name\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_categories\` ADD \`name\` varchar(50) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_8c775c80f1ab54eb9a211ef0b2\` ON \`sub_categories\` (\`name\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_categories\` DROP COLUMN \`brands\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_categories\` ADD \`brands\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_categories\` CHANGE \`updated_at\` \`updated_at\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_categories\` CHANGE \`created_at\` \`created_at\` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_categories\` ADD CONSTRAINT \`FK_983e9e4557905013353e9118a52\` FOREIGN KEY (\`main_category_id\`) REFERENCES \`main_categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`category_id\` \`category_id\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`type\``);
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`type\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`colors\``);
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`colors\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`brand\``);
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`brand\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP COLUMN \`short_description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`short_description\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`reviews\``);
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`reviews\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`image\``);
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`image\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`slug\` \`slug\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`updated_at\` \`updated_at\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`created_at\` \`created_at\` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`name\``);
    await queryRunner.query(
      `CREATE INDEX \`FK_9a5f6868c96e0069e699f33e124\` ON \`products\` (\`category_id\`)`,
    );
  }
}
