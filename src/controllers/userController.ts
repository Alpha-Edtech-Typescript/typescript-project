import { Request, Response } from 'express';
import * as userService from '../services/userServices';
import { IAPIResponse } from "../interfaces/api";
import { IUser } from "../interfaces/user";
import { isAdmin } from '../utils/isAdmin';

export const createUser = async (req: Request, res: Response) => {
    const response: IAPIResponse<IUser> = { data: null, error: null, message: null };
    try {
        const { username, email, first_name, last_name, password, squad } = req.body;

        const user = await userService.createUser(username, email, first_name, last_name, password, squad);
        response.data = user;
        response.message = "Usuário cadastrado com sucesso!"
        res.status(201).json(response);
    } catch (error: any) {
        response.error = error.message;
        return res.status(400).json(response);
        // res.status(500).json({ error: 'Falha ao criar usuário' });
    }
};