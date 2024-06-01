import * as teamRepository from "../repositories/teamRepository";
import { ITeam } from "../interfaces/team";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../utils/validation";
import { hashPassword } from "../utils/hashPassword";

export const getAllTeams = async (): Promise<ITeam[]> => {
  return await teamRepository.getAllTeams();
};

export const getTeamById = async (id: number): Promise<ITeam> => {
  return await teamRepository.getTeamById(id);
};

export const deleteTeam = async (teamId: number): Promise<ITeam> => {
  const team = await teamRepository.getTeamById(teamId);
  if (!team) throw new Error("Team not found");

  return await teamRepository.deleteTeam(teamId);
};
