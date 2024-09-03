"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: process.env.DATABASE_URL?.split(':')[1] || './src/database/db.sqlite',
    entities: [__dirname + '/entity/*.ts'],
    migrations: ['./src/database/migrations/*.ts'],
    synchronize: true,
});
