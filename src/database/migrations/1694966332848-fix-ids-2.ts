import {MigrationInterface, QueryRunner} from "typeorm";

export class fixIds21694966332848 implements MigrationInterface {
    name = 'fixIds21694966332848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "product"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."id" IS NULL`);
        await queryRunner.query(`CREATE SEQUENCE "user_id_seq" OWNED BY "user"."id"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq')`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "customer"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "customer"."updateAt" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "customer"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "customer"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "user_id_seq"`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."id" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."createdAt" IS NULL`);
    }

}
