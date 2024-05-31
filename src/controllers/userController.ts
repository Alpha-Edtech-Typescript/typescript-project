// userController.ts

// Importações
import { Request, Response } from "express";
import * as userService from "../services/userServices";
import { IAPIResponse } from "../interfaces/api";
import { IUser } from "../interfaces/user";

// Função que cria um novo usuário
export const createUser = async (req: Request, res: Response) => {
	const response: IAPIResponse<IUser> = { success: false };
	try {
		const {
			username,
			email,
			first_name,
			last_name,
			password,
			squad,
			is_admin,
		} = req.body;

		// Descomente as validações conforme necessário
		// if(!username){
		//     return res.status(400).json({ error: 'O username não pode ser vazio' });
		// }

		// if (typeof username !== 'string'){
		//     return res.status(400).json({ error: 'Tipos de dados inválidos no username, ele deve ser um string' });
		// }

		// if(!email){
		//     return res.status(400).json({ error: 'O email não pode ser vazio' });
		// }

		// if (typeof email !== 'string'){
		//     return res.status(400).json({ error: 'Tipos de dados inválidos no email, ele deve ser um string' });
		// }

		// if(!first_name){
		//     return res.status(400).json({ error: 'O nome não pode ser vazio' });
		// }

		// if (typeof first_name !== 'string'){
		//     return res.status(400).json({ error: 'Tipos de dados inválidos no nome, ele deve ser um string' });
		// }

		// if(!last_name){
		//     return res.status(400).json({ error: 'O sobrenome não pode ser vazio' });
		// }

		// if (typeof last_name !== 'string'){
		//     return res.status(400).json({ error: 'Tipos de dados inválidos no sobrenome, ele deve ser um string' });
		// }

		// if(!password){
		//     return res.status(400).json({ error: 'A senha não pode ser vazia' });
		// }

		// if (typeof password !== 'string'){
		//     return res.status(400).json({ error: 'Tipos de dados inválidos na senha, ela deve ser uma string' });
		// }

		// if (typeof username !== 'string'){
		//     return res.status(400).json({ error: 'Tipos de dados inválidos no username, ele deve ser um string' });
		// }

		// if(!is_admin){
		//     return res.status(400).json({ error: 'A informação sobre o cargo de administrados não pode ser vazia' });
		// }

		// if(squad){
		//     if(typeof squad !== 'number'){
		//         return res.status(400).json({ error: 'Tipos de dados inválidos na squad, ela deve ser um número inteiro' });
		//     }
		// }

		// Cria o usuário com os dados fornecidos
		const user = await userService.createUser(
			username,
			email,
			first_name,
			last_name,
			password,
			squad,
			is_admin
		);
		response.success = true;
		response.data = user;
		response.message = "Usuário cadastrado com sucesso!";
		res.status(201).json(response);
	} catch (error: any) {
		response.error = error.message;
		response.message = "Não foi possível cadastrar o usuário";
		return res.status(400).json(response);
	}
};

// Função que obtém dados do usuário autenticado
export const getUserMe = async (req: Request, res: Response) => {
	const response: IAPIResponse<IUser> = { success: false };
	try {
		const { id } = (req as any).user;
		const user = await userService.getUserById(id);
		response.success = true;
		response.data = user[0];
		res.status(200).json(response);
	} catch (error: any) {
		response.error = error.message;
		return res.status(500).json(response);
	}
};
