import { ITeam } from "../interfaces/team";
import * as teamRepository from "../repositories/teamRepository";

export const isLeader = async (userId: string): Promise<boolean> => {
  try {
    const team: ITeam | null = await teamRepository.getTeamByLeaderId(userId);
    return team !== null;
  } catch (error) {
    console.error("Error checking if the user is a leader:", error);
    throw new Error("Failed checking if the user is a leader.");
  }
};
