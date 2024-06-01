import { IUser } from "../interfaces/user";
import * as userRepository from "../repositories/userRepository";

export const isAdmin = async (userId: string): Promise<boolean> => {
  try {
    const user: IUser = await userRepository.getUserById(userId);
    return user.is_admin === true;
  } catch (error) {
    console.error("Erro ao verificar se o usuário é admin:", error);
    throw new Error("Falha ao verificar permissão de administrador");
  }
};
