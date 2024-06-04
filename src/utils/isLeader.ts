import { ITeam } from "../interfaces/team";
import * as teamRepository from "../repositories/teamRepository";

export const isLeader = async (userId: string, teamId: string): Promise<boolean> => {
  try {
    const team: ITeam | null = await teamRepository.getTeamByLeaderId(userId);

    if (team?.id === teamId) {
      if (userId !== team?.leaderId)
        return false;
    }

    return team !== null;
  } catch (error) {
    console.error("Error checking if the user is a leader:", error);
    throw new Error("Failed checking if the user is a leader.");
  }
};
