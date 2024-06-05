import { Request, Response } from "express";
import * as teamServices from "../services/teamServices";
import * as userRepository from "../repositories/userRepository";
import { IAPIResponse } from "../interfaces/api";
import { ITeam } from "../interfaces/team";
import { isAdmin } from "../utils/isAdmin";
import { isLeader } from "../utils/isLeader";
import { IUser } from "../interfaces/user";
import { isAnyLeader } from "../utils/isAnyLeader";
import { isMember } from "../utils/isMember"

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
    const loggedUser = String(req.user);
    const adminLogged = await isAdmin(loggedUser);
    const leaderLogged = await isAnyLeader(loggedUser);

    if (!adminLogged && !leaderLogged) {
      throw new Error(
        "Permission denied, you need to be an admin or a leader to see the teams."
      );
    }

    const teams: ITeam[] = await teamServices.getAllTeams();
    const response: IAPIResponse<ITeam[]> = {
      success: true,
      data: teams,
      message: "Teams retrieved successfully",
    };
    res.json(response);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ data: null, error: error.message });
  }
};

export const getTeamById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const teamId = req.params.teamId;

    const loggedUser = String(req.user);
    const adminLogged = await isAdmin(loggedUser);
    const leaderLogged = await isAnyLeader(loggedUser);
    const memberLogged = await isMember(loggedUser, teamId)

    if (!adminLogged && !leaderLogged && !memberLogged) {
      throw new Error(
        "Permission denied, you need to be an admin, a leader or a member to see the teams."
      );
    }

    const team = await teamServices.getTeamById(teamId);
    const response: IAPIResponse<ITeam> = {
      success: true,
      data: team,
      message: "Team retrieved successfully",
    };
    res.json(response);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ data: null, error: error.message });
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

export const getUsersByTeamId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const response: IAPIResponse<IUser[]> = { success: false };
  try {
    const teamId = req.params.teamId;

    const loggedUser = String(req.user);
    const adminLogged = await isAdmin(loggedUser);
    const leaderLogged = await isLeader(loggedUser, teamId);
    const memberLogged = await isMember(loggedUser, teamId)

    if (!adminLogged && !leaderLogged && !memberLogged) {
      throw new Error(
        "Permission denied, you need to be an admin, a leader or a member to see the teams."
      );
    }

    const users: IUser[] = await teamServices.getUsersByTeamId(teamId);
    response.data = users;
    response.success = true;
    response.message = "Users retrieved successfully";
    res.status(200).json(response);
  } catch (error: any) {
    console.error(error);
    response.error = error;
    response.message = error.message;
    res.status(500).json(response);
  }
};

export const updateTeam = async (
  req: Request,
  res: Response
): Promise<void> => {
  const response: IAPIResponse<ITeam> = { success: false };
  try {
    const teamId = req.params.teamId;
    const updates = req.body;
    const userId = req.user;

    if (!userId) {
      throw new Error("User not authenticated.");
    }

    const isAdminUser = await isAdmin(userId);
    const isLeaderUser = await isLeader(userId, teamId);

    if (!isAdminUser && !isLeaderUser) {
      throw new Error("You do not have permission to update this team.");
    }

    const updatedTeam = await teamServices.updateTeam(teamId, updates);
    response.data = updatedTeam;
    response.success = true;
    response.message = "Team updated successfully!";
    res.status(200).json(response);
  } catch (error: any) {
    response.error = error.message;
    res.status(400).json(response);
  }
};

export const addMember = async (req: Request, res: Response) => {
  try {
    const { user_id, team_id } = req.params;
    const isLeaderAdmin = await isAnyLeader(user_id);

    if (isLeaderAdmin) throw new Error("This user is already a team leader");

    await teamServices.addMember(user_id, team_id);
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
