import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProduct1647550427786 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'products',
                columns: [
                    {
                        name: 'id',
                        type: 'uniqueidentifier',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'code',
                        type: 'varchar',
                    },
                    {
                        name: 'sector',
                        type: 'varchar',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'amount',
                        type: 'int',
                    },
                    {
                        name: 'created_at',
                        type: 'datetime',
                        default: 'current_timestamp',
                    },
                    {
                        name: 'updated_at',
                        type: 'datetime',
                        default: 'current_timestamp',
                    },

                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products')
    }

}
