import {MigrationInterface, QueryRunner} from "typeorm";

export class addFields1694915466027 implements MigrationInterface {
    name = 'addFields1694915466027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "product" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "createdAt"`);
    }

}
