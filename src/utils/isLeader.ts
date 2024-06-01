import { ITeam } from "../interfaces/team";
import * as teamRepository from "../repositories/teamRepository";

export const isLeader = async (userId: string): Promise<boolean> => {
  try {
    const team: ITeam | null =
      await teamRepository.getTeamByLeaderId(userId);
    return team !== null;
  } catch (error) {
    console.error("Erro ao verificar se o usuário é líder:", error);
    throw new Error("Falha ao verificar se o usuário é líder");
  }
};
