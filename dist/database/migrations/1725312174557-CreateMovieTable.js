"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMovieTable1725312174557 = void 0;
const typeorm_1 = require("typeorm");
class CreateMovieTable1725312174557 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'movies',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'description',
                    type: 'text',
                },
                {
                    name: 'actors',
                    type: 'simple-array',
                },
                {
                    name: 'genre',
                    type: 'varchar',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('movies');
    }
}
exports.CreateMovieTable1725312174557 = CreateMovieTable1725312174557;
