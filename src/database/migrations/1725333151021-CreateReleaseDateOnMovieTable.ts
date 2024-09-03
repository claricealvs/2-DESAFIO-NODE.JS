import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddReleaseDateToMovies1693638400000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Passo 1: Adiciona a nova coluna sem um valor padrão
    await queryRunner.query(
      `ALTER TABLE movies ADD COLUMN release_date datetime`,
    );

    // Passo 2: Atualiza todos os registros existentes para definir o valor padrão
    await queryRunner.query(
      `UPDATE movies SET release_date = CURRENT_TIMESTAMP WHERE release_date IS NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Para desfazer a migração, removemos a coluna
    await queryRunner.query(`ALTER TABLE movies DROP COLUMN release_date`);
  }
}
