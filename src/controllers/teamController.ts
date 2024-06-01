import { Request, Response } from "express";
import * as teamServices from "../services/teamServices";
import { IAPIResponse } from "../interfaces/api";
import { ITeam } from "../interfaces/team";
import { isAdmin } from "../utils/isAdmin";
import { isLeader } from "../utils/isLeader";

export const createTeam = async (req: Request, res: Response) => {
  const response: IAPIResponse<ITeam> = {
    data: null,
    error: null,
    message: null,
  };
  try {
    const { name, leaderId } = req.body;
    const userId = req.user;

    if (!userId) {
      throw new Error("Usuário não autenticado");
    }

    const team = await teamServices.createTeam(userId, name, leaderId);
    response.data = team;
    response.message = "Time criado com sucesso!";
    res.status(201).json(response);
  } catch (error: any) {
    response.error = error.message;
    return res.status(400).json(response);
  }
};
