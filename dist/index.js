"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
require("reflect-metadata");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, typeorm_1.createConnection)()
    .then(() => {
    app.use('/api', apiRoutes_1.default);
    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    });
})
    .catch((error) => console.log(error));
