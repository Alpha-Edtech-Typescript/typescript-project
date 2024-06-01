import { Request, Response } from "express";
<<<<<<< HEAD
import * as teamServices from "../services/teamServices";
=======
import * as teamService from "../services/teamService";
>>>>>>> af3c34622fc9bdcaa7fe6b91181766c22e9783e7
import { IAPIResponse } from "../interfaces/api";
import { ITeam } from "../interfaces/team";
import { isAdmin } from "../utils/isAdmin";
import { isLeader } from "../utils/isLeader";

<<<<<<< HEAD
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
=======
export const getAllTeams = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const teams: ITeam[] = await teamService.getAllTeams();
        const response: IAPIResponse<ITeam[]> = {
            data: teams,
            error: null,
            message: "Teams retrieved successfully"
        };
        res.json(response);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ data: null, error: "Internal server erro" });
    }
};

export const getTeamById = async (req: Request, res: Response): Promise<void> => {
    try {
        const team = await teamService.getTeamById(Number(req.params.id));
        res.json({ data: team, error: null });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ data: null, error: "Internal server error" });
    }
};

export const deleteTeam = async (
    req: Request,
    res: Response,
    ): Promise<void> => {
    try {
        const deletedTeam = await teamService.deleteTeam(Number(req.params.id));
        res.json({ data: deletedTeam, error: null });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ data: null, error: "Internal server error" });
    }
>>>>>>> af3c34622fc9bdcaa7fe6b91181766c22e9783e7
};
