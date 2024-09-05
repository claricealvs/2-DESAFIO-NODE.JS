import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTickets1725476895769 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tickets',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'chair',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'value',
            type: 'int',
          },
          {
            name: 'session_id',
            type: 'int',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'tickets',
      new TableForeignKey({
        columnNames: ['session_id'],
        referencedTableName: 'sessions',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tickets', 'session_id');
    await queryRunner.dropTable('tickets');
  }
}
