"use strict";
// connection.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
// Importações
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
// Carrega as variáveis de ambiente
dotenv_1.default.config();
// Cria uma instância do Pool
exports.pool = new pg_1.Pool({
    connectionString: process.env.CONNECTION_STRING,
});
