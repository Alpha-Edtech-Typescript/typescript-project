// app.ts

// Importações
import dotenv from "dotenv";
import express, { Express } from "express";
import cookieParser from "cookie-parser";
import routes from "./routes/routes";
import { pool } from "./database/connection";

// Carrega as variáveis de ambiente
dotenv.config();

// Cria uma instância do Express
const app: Express = express();

// Usa middlewares para processar o corpo de solicitações
app.use(cookieParser());
app.use(express.json());

// Monta as rotas definidas
app.use("/api", routes);

// Define a porta do servidor
const PORT = Number(process.env.PORT) || 3000;

// Estabelece conexão com o banco de dados
pool.connect()
    .then(() => {
        // Inicia o servidor Express na porta especificada
        app.listen(PORT, () => {
            console.log(`Server running on: http://localhost:${PORT}`);
        });
    })
    .catch((error: any) => {
        // Trata erros na conexão com o banco de dados
        if (error instanceof Error) {
            console.error("Error connecting to database:", error.message);
        } else {
            console.error("Error connecting to database:", error);
        }
    });
