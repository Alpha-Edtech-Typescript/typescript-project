// connection.ts

// Importações
import { Pool } from "pg";
import dotenv from "dotenv";

// Carrega as variáveis de ambiente
dotenv.config();

// Cria uma instância do Pool
export const pool = new Pool({
	connectionString: process.env.CONNECTION_STRING,
});
