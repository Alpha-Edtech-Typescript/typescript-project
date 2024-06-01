import { ISquad } from '../interfaces/squad';
import * as squadRepository from '../repositories/squadRepository';

export const isLeader = async (userId: string): Promise<boolean> => {
  try {
    const squad: ISquad | null =
      await squadRepository.getSquadByLeaderId(userId);
    return squad !== null;
  } catch (error) {
    console.error('Erro ao verificar se o usuário é líder:', error);
    throw new Error('Falha ao verificar se o usuário é líder');
  }
};
