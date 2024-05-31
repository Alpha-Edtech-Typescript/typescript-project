"use strict";
// logoutRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
// Importações
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
// Cria um novo roteador
const router = (0, express_1.Router)();
// Define a rota DELETE para logout e associa a função de logout do controlador
router.delete("/", loginController_1.logout);
// Exporta o roteador criado para uso em outros arquivos
exports.default = router;
