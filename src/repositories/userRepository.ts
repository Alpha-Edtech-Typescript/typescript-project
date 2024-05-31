// userRepository.ts

// Importações
import { pool } from "../database/connection";

// Função que cria um novo usuário no banco de dados
export const createUser = async (
	username: string,
	email: string,
	first_name: string,
	last_name: string,
	password: string,
	squad: number,
	is_admin: boolean
) => {
	const query =
		"INSERT INTO users (username, email, first_name, last_name, password, squad, is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
	try {
		const result = await pool.query(query, [
			username,
			email,
			first_name,
			last_name,
			password,
			squad,
			is_admin,
		]);
		return result.rows[0]; // Retorna o usuário criado
	} catch (error) {
		console.error("Erro ao criar usuário:", error);
		throw new Error("Falha ao criar usuário");
	}
};

// Função que obtém um usuário pelo username
export const getUserByUsername = async (username: string) => {
	const query = "SELECT * FROM users WHERE username=$1";
	try {
		const result = await pool.query(query, [username]);
		return result.rows; // Retorna o usuário encontrado
	} catch (error) {
		console.log(error);
		throw new Error("Falha ao localizar o usuário pelo username");
	}
};

// Função que obtém um usuário pelo email
export const getUserByEmail = async (email: string) => {
	const query = "SELECT * FROM users WHERE email=$1";
	try {
		const result = await pool.query(query, [email]);
		return result.rows; // Retorna o usuário encontrado
	} catch (error) {
		console.log(error);
		throw new Error("Falha ao localizar o usuário pelo email");
	}
};

// Função que obtém um usuário pelo id
export const getUserById = async (id: string) => {
	const query = "SELECT * FROM users WHERE id=$1";
	try {
		const result = await pool.query(query, [id]);
		return result.rows; // Retorna o usuário encontrado
	} catch (error) {
		console.log(error);
		throw new Error("Falha ao localizar o usuário pelo ID");
	}
};
