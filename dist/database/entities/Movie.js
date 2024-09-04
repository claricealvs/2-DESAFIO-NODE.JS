"use strict";
// src/database/entities/Movie.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const typeorm_1 = require("typeorm");
let Movie = class Movie {
};
exports.Movie = Movie;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)() // Campo da chave primária que é gerado automaticamente
], Movie.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)() // Nome do filme
], Movie.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)() // Descrição do filme
], Movie.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array') // Armazena uma lista de atores como um array simples
], Movie.prototype, "actors", void 0);
__decorate([
    (0, typeorm_1.Column)() // Gênero do filme
], Movie.prototype, "genre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Data de criação
], Movie.prototype, "createdAt", void 0);
exports.Movie = Movie = __decorate([
    (0, typeorm_1.Entity)('movies') // Nome da tabela no banco de dados
], Movie);
