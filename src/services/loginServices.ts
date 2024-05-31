// loginServices.ts

// Importações
import jwt from "jsonwebtoken"; // Para gerar tokens JWT
import { comparePassword } from "../utils/comparePassword"; // Para comparar senhas
import { SECRET_KEY } from "../config"; // Chave secreta para assinar tokens
import * as userRepository from "../repositories/userRepository"; // Repositório de usuários

// Função que obtém um usuário pelo nome de usuário
export const getUser = async (username: string) => {
	try {
		const user = await userRepository.getUserByUsername(username);
		return user;
	} catch (error) {
		throw error;
	}
};

// Função que autentica um usuário com nome de usuário e senha
export const authenticateUser = async (username: string, password: string) => {
	try {
		const user = await userRepository.getUserByUsername(username);
		if (user && user.length > 0) {
			const matchPassword = await comparePassword(
				password,
				user[0].password
			);
			if (matchPassword) {
				const token = jwt.sign(
					{
						id: user[0].id,
						// Adicione outras informações do usuário conforme necessário
					},
					SECRET_KEY,
					{ expiresIn: "5d" }
				);
				return { auth: true, token };
			}
		}
		return { auth: false, error: "Usuário e/ou senha inválidos" };
	} catch (error) {
		console.log(error);
		throw new Error("Falha na autenticação do usuário");
	}
};

// Exporta função que busca usuário pelo username
export function getUserByUsername(username: any) {
	throw new Error("Function not implemented.");
}
