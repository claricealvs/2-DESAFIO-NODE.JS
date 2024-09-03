"use strict";
// src/routes/apiRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const Movie_1 = require("../database/entities/Movie"); // Ajuste conforme sua estrutura de diretórios
const router = (0, express_1.Router)();
// Rota GET para buscar todas as entidades
router.get('/your-entity', async (req, res) => {
    const repository = (0, typeorm_1.getRepository)(Movie_1.Movie);
    const entities = await repository.find();
    return res.json(entities);
});
// Rota POST para criar uma nova entidade
router.post('/your-entity', async (req, res) => {
    const repository = (0, typeorm_1.getRepository)(Movie_1.Movie);
    const newEntity = repository.create(req.body);
    const savedEntity = await repository.save(newEntity);
    return res.status(201).json(savedEntity);
});
// Rota DELETE para deletar uma entidade específica
router.delete('/your-entity/:id', async (req, res) => {
    const repository = (0, typeorm_1.getRepository)(Movie_1.Movie);
    await repository.delete(req.params.id);
    return res.status(204).send();
});
// Adicione mais rotas conforme necessário
exports.default = router;
