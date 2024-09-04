import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveImageColumn1725478674875 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('movies', 'image');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'movies',
      new TableColumn({
        name: 'image',
        type: 'varchar',
      }),
    );
  }
}
