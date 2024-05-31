// userServices.ts

// Importações
import * as userRepository from "../repositories/userRepository";
import { IUser } from "../interfaces/user";
import {
	validateEmail,
	validatePassword,
	validateName,
} from "../utils/validation";
import { hashPassword } from "../utils/hashPassword";

// Exporta função que cria usuário
export const createUser = async (
	username: string,
	email: string,
	first_name: string,
	last_name: string,
	password: string,
	squad: number,
	is_admin: boolean
) => {
	try {
		if (!username) {
			throw new Error("O username não pode ser vazio");
		}

		if (typeof username !== "string") {
			throw new Error(
				"Tipos de dados inválidos no username, ele deve ser um string"
			);
		}

		if (!validateName(username)) {
			throw new Error("O username deve ter no mínimo 4 caracteres");
		}

		if (!email) {
			throw new Error("O email não pode ser vazio");
		}

		if (typeof email !== "string") {
			throw new Error(
				"Tipos de dados inválidos no email, ele deve ser um string"
			);
		}

		if (!validateEmail(email)) {
			throw new Error(
				"Formato de email inválido. (example@example.com) "
			);
		}

		if (!first_name) {
			throw new Error("O nome não pode ser vazio");
		}

		if (typeof first_name !== "string") {
			throw new Error(
				"Tipos de dados inválidos no nome, ele deve ser um string"
			);
		}

		if (!last_name) {
			throw new Error("O sobrenome não pode ser vazio");
		}

		if (typeof last_name !== "string") {
			throw new Error(
				"Tipos de dados inválidos no sobrenome, ele deve ser um string"
			);
		}

		if (!password) {
			throw new Error("A senha não pode ser vazia");
		}

		// if (typeof password !== 'string'){
		//     throw new Error({ error: 'Tipos de dados inválidos na senha, ela deve ser uma string' });
		// }

		if (!validatePassword(password)) {
			throw new Error(
				"A senha deve ter no mínimo 8 caracteres sendo ao menos 1 maiúscula e 1 número"
			);
		}

		if (typeof username !== "string") {
			throw new Error(
				"Tipos de dados inválidos no username, ele deve ser um string"
			);
		}

		if (!is_admin) {
			// throw new Error('A informação sobre o cargo de administrados não pode ser vazia');
			is_admin = false;
		}

		if (squad) {
			if (typeof squad !== "number") {
				throw new Error(
					"Tipo de dado inválido na squad, deve ser um número inteiro"
				);
			}
		}

		const existingUser = await userRepository.getUserByUsername(username);
		if (existingUser.length > 0) {
			throw new Error("Nome de usuário já cadastrado!");
		}

		const existingEmail = await userRepository.getUserByEmail(email);
		if (existingEmail.length > 0) {
			throw new Error("Email já cadastrado.");
		}

		const hashedPassword = await hashPassword(password);

		if (!hashedPassword) {
			throw new Error("Erro ao gerar o hash da senha");
		}

		const user = await userRepository.createUser(
			username,
			email,
			first_name,
			last_name,
			hashedPassword,
			squad,
			is_admin
		);
		return user;
	} catch (error: any) {
		throw error;
	}
};

// Exporta função que busca usuário pelo username
export const getUserByUsername = async (username: string) => {
	try {
		const user = await userRepository.getUserByUsername(username);
		return user;
	} catch (error) {
		throw error;
	}
};

// Exporta função que busca usuário pelo ID
export const getUserById = async (id: string) => {
	try {
		const user = await userRepository.getUserById(id);
		return user;
	} catch (error) {
		throw error;
	}
};