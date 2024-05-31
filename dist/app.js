"use strict";
// app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importações
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes/routes"));
const connection_1 = require("./database/connection");
// Carrega as variáveis de ambiente
dotenv_1.default.config();
// Cria uma instância do Express
const app = (0, express_1.default)();
// Usa middlewares para processar o corpo de solicitações
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
// Monta as rotas definidas
app.use("/api", routes_1.default);
// Define a porta do servidor
const PORT = Number(process.env.PORT) || 3000;
// Estabelece conexão com o banco de dados
connection_1.pool.connect()
    .then(() => {
    // Inicia o servidor Express na porta especificada
    app.listen(PORT, () => {
        console.log(`Server running on: http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    // Trata erros na conexão com o banco de dados
    if (error instanceof Error) {
        console.error("Error connecting to database:", error.message);
    }
    else {
        console.error("Error connecting to database:", error);
    }
});
