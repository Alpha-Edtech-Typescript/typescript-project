import * as teamRepository from "../repositories/teamRepository";
import * as userRepository from "../repositories/userRepository";
import { ITeam } from "../interfaces/team";
import { isAdmin } from "../utils/isAdmin";
import { isLeader } from "../utils/isLeader";

export const createTeam = async (
  userId: string,
  teamName: string,
  leaderId: string
): Promise<ITeam> => {
  const isAdminUser = await isAdmin(userId);
  if (!isAdminUser) {
    throw new Error("Apenas administradores podem criar equipes.");
  }

  // Verifica se o líder existe
  const leader = await userRepository.getUserById(leaderId);
  if (!leader) {
    throw new Error("Líder não encontrado.");
  }

  // Verifica se o líder já é líder de outra equipe
  const existingTeam = await teamRepository.getTeamByLeaderId(leaderId);
  if (existingTeam) {
    throw new Error("O usuário já é líder de outra equipe.");
  }

  // Verifica se o nome da equipe já existe
  const existingTeamByName = await teamRepository.getTeamByName(teamName);
  if (existingTeamByName) {
    throw new Error("O nome da equipe já está em uso.");
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

export const getTeamById = async (id: number): Promise<ITeam> => {
  return await teamRepository.getTeamById(id);
};

export const deleteTeam = async (teamId: number): Promise<ITeam> => {
  const team = await teamRepository.getTeamById(teamId);
  if (!team) throw new Error("Team not found");

  return await teamRepository.deleteTeam(teamId);
};
