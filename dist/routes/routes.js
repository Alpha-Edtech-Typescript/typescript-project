"use strict";
// routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importações
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const loginRoutes_1 = __importDefault(require("../routes/loginRoutes"));
const logoutRoutes_1 = __importDefault(require("../routes/logoutRoutes"));
// Cria um novo roteador
const router = (0, express_1.Router)();
// Definine as rotas e associa os roteadores correspondentes
router.use("/users", userRoutes_1.default);
router.use("/login", loginRoutes_1.default);
router.use("/logout", logoutRoutes_1.default);
// Exporta o roteador criado para uso em outros arquivos
exports.default = router;
