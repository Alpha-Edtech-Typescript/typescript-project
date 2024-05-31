"use strict";
// loginRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
// Importações
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
// Cria um novo roteador
const router = (0, express_1.Router)();
// Definine a rota POST para autenticação e associa a função de autenticação do controlador
router.post("/", loginController_1.authenticate);
// Exporta o roteador criado para uso em outros arquivos
exports.default = router;
