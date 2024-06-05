// import { ITeam } from "../interfaces/team";
import * as teamRepository from "../repositories/teamRepository";

export const isAnyLeader = async (userId: string): Promise<boolean> => {
  try {
    const isAnyLeader = await teamRepository.getTeamByLeaderId(userId);

    if (isAnyLeader === null) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error checking if the user is a leader:", error);
    throw new Error("Failed checking if the user is a leader.");
  }
};
