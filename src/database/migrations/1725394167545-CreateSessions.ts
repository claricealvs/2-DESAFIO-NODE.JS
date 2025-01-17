import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateSessions1725394167545 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sessions',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'room',
            type: 'varchar',
          },
          {
            name: 'capacity',
            type: 'int',
          },
          {
            name: 'day',
            type: 'varchar',
          },
          {
            name: 'time',
            type: 'varchar',
          },
          {
            name: 'movie_id',
            type: 'integer',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'sessions',
      new TableForeignKey({
        columnNames: ['movie_id'],
        referencedTableName: 'movies',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('sessions', 'movie_id');
    await queryRunner.dropTable('sessions');
  }
}
