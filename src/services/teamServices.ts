import * as teamRepository from "../repositories/teamRepository";
import * as userRepository from "../repositories/userRepository";
import { ITeam } from "../interfaces/team";
import { isAdmin } from "../utils/isAdmin";
import { isLeader } from "../utils/isLeader";
import { IUser } from "../interfaces/user";

export const createTeam = async (
  userId: string,
  teamName: string,
  leaderId: string
): Promise<ITeam> => {
  const isAdminUser = await isAdmin(userId);
  if (!isAdminUser) {
    throw new Error("Only admin can create teams.");
  }

  // Verifica se o líder existe
  const leader = await userRepository.getUserById(leaderId);
  if (!leader) {
    throw new Error("Leader not found.");
  }

  // Verifica se o líder já é líder de outra equipe
  const existingTeam = await teamRepository.getTeamByLeaderId(leaderId);
  if (existingTeam) {
    throw new Error("User already a team leader.");
  }

  // Verifica se o nome da equipe já existe
  const existingTeamByName = await teamRepository.getTeamByName(teamName);
  if (existingTeamByName) {
    throw new Error("Team name already in use.");
  }

  // Cria uma nova equipe, não mandei o id por que ele vai ser gerado pelo banco
  const newTeam: ITeam = {
    name: teamName,
    leaderId: leaderId,
  };

  return await teamRepository.createTeam(newTeam);
};

export const getAllTeams = async (): Promise<ITeam[]> => {
  return await teamRepository.getAllTeams();
};

export const getTeamById = async (teamId: string): Promise<ITeam> => {
  const teamIdString = teamId.toString();
  return await teamRepository.getTeamById(teamId);
};

export const deleteTeam = async (teamId: string): Promise<ITeam> => {
  const team = await teamRepository.getTeamById(teamId);
  if (!team) throw new Error("Team not found");

  return await teamRepository.deleteTeam(teamId);
};
