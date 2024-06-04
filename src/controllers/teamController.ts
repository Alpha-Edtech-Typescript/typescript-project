import { Request, Response } from "express";
import * as teamServices from "../services/teamServices";
import { IAPIResponse } from "../interfaces/api";
import { ITeam } from "../interfaces/team";
import { isAdmin } from "../utils/isAdmin";
import { isLeader } from "../utils/isLeader";
import { IUser } from "../interfaces/user";


export const createTeam = async (req: Request, res: Response) => {
  const response: IAPIResponse<ITeam> = { success: false };
  try {
    const { name, leaderId } = req.body;
    const userId = req.user;

    if (!userId) {
      throw new Error("User not authenticated.");
    }

    const team = await teamServices.createTeam(userId, name, leaderId);
    response.data = team;
    response.message = "Team created successfully!";
    res.status(201).json(response);
  } catch (error: any) {
    response.error = error.message;
    return res.status(400).json(response);
  }
};

export const getAllTeams = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const teams: ITeam[] = await teamServices.getAllTeams();
    const response: IAPIResponse<ITeam[]> = {
      success: true,
      data: teams,
      message: "Teams retrieved successfully",
    };
    res.json(response);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ data: null, error: "Internal server erro" });
  }
};

export const getTeamById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const team = await teamServices.getTeamById(req.params.teamId);
    res.json({ data: team, error: null });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ data: null, error: "Internal server error" });
  }
};

export const deleteTeam = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedTeam = await teamServices.deleteTeam(req.params.teamId);
    res.json({ data: deletedTeam, error: null });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ data: null, error: "Internal server error" });
  }
};

export const getUsersByTeamId = async (req: Request, res: Response): Promise<void> => {
  const response: IAPIResponse<IUser[]> = { success: false };
  try {
      const teamId = req.params.teamId;
      const users: IUser[] = await teamServices.getUsersByTeamId(Number(teamId));
      response.data = users;
      response.success = true;
      response.message = "Users retrieved successfully";
      res.status(200).json(response);
  } catch (error: any) {
      console.error(error);
      response.error = "Internal server error";
      response.message = "Failed to fetch users by teamId";
      res.status(500).json(response);
  }
};

export const addMember = async (req: Request, res: Response) => {
  try {
    const { team_id, user_id } = req.params;
    await teamServices.addMember(team_id, user_id);
    res.status(200).json({ message: "Membro adicionado com sucesso!" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const removeMember = async (req: Request, res: Response) => {
  try {
    const { team_id, user_id } = req.params;
    await teamServices.removeMember(team_id, user_id);
    res.status(200).json({ message: "Membro removido com sucesso!" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};