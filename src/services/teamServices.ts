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

  return await teamRepository.createTeam(teamName, leaderId);
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

export const getUsersByTeamId = async (teamId: number): Promise<IUser[]> => {
  const teamIdString = teamId.toString();
  return await userRepository.getUsersByTeamId(teamIdString);
};

export const updateTeam = async (teamId: string, updates: Partial<ITeam>): Promise<ITeam> => {
  try{
    const existingTeam = await teamRepository.getTeamById(teamId);
    if (!existingTeam) {
      throw new Error("Team not found.");
    }
  
    return await teamRepository.updateTeam(teamId, updates);
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(`Failed to update team: ${error.message}`);
    }

    throw new Error(`Error updating team: ${error}`);
  }
};

//Parte nova do Murilo para testar
export const addMember = async (team_id: string, user_id: string) => {
  const user = await userRepository.getUserById(user_id);
  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const team = await teamRepository.getTeamById(team_id);
  if (!team) {
    throw new Error("Equipe não encontrada.");
  }

  user.teamId = team.id;
  await userRepository.updateUser(user);
};

export const removeMember = async (team_id: string, user_id: string) => {
  const user = await userRepository.getUserById(user_id);
  if (!user || user.teamId !== team_id) {
    throw new Error("Usuário não encontrado na equipe.");
  }

  user.teamId = null;
  await userRepository.updateUser(user);
};