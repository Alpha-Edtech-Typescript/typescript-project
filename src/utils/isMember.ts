import * as userRepository from "../repositories/userRepository";

export const isMember = async (userId: string, teamId: string): Promise<boolean> => {
  try {

    const isMember = await userRepository.getUsersByTeamId(teamId);
    
     // Verificar se a equipe tem membros
     if (isMember.length === 0) {
        return false;
      }


    // Verificar se o usuário está na equipe
    const userInTeam = isMember.some(user => user.id === userId);

    // Se o usuário não estiver na equipe, retorna false
    if (!userInTeam) {
      return false;
    }


    // Verificar se o usuário específico é membro dessa equipe
    const specificUser = isMember.find(user => user.id === userId);
    if (specificUser && specificUser.teamId === teamId) {
        return true;
    } 

    return false;
  } catch (error) {
    console.error("Error checking if the user is a member:", error);
    throw new Error("Failed checking if the user is a member.");
  }
};
