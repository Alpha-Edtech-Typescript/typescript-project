import { Request, Response } from "express";
import * as userServices from "../services/userServices";
import { IAPIResponse } from "../interfaces/api";
import { IUser } from "../interfaces/user";
import { isAdmin } from "../utils/isAdmin";
import { isLeader } from "../utils/isLeader";

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const response: IAPIResponse<IUser[]> = { success: false };
  try {
    const users: IUser[] = await userServices.getAllUsers();
    response.data = users;
    response.success = true;
    response.message = "Users retrieved successfully";
    res.status(200).json(response);
  } catch (error: any) {
      console.error(error);
      res.status(500).json({ data: null, error: "Internal server erro" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const response: IAPIResponse<IUser> = { success: false };
  try {
    const { username, email, first_name, last_name, password, team } = req.body;

    const user = await userServices.createUser(
      username,
      email,
      first_name,
      last_name,
      password,
      team,
    );
    response.data = user;
    response.success = true;
    response.message = "Usuário cadastrado com sucesso!";
    res.status(201).json(response);
  } catch (error: any) {
    response.error = error.message;
    response.message = "Não foi possível cadastrar o usuário!";
    return res.status(400).json(response);
  }
};

export const getUserMe = async (req: Request, res: Response) => {
	const response: IAPIResponse<IUser> = { success: false };
	try {
    const userId = req.user ?? '';
    if (!userId) {
      throw new Error('ID do usuário não encontrado');
    }
		const user = await userServices.getUserById(userId);
		response.success = true;
		response.data = user;
    response.message = "Seu usuário foi encontrado com sucesso!"
		res.status(200).json(response);
	} catch (error: any) {
    response.error = error.message;
    response.message = "Não foi possível encontrar as suas informações!";
		return res.status(500).json(response);
	}
};

