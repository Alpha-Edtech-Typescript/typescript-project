import { IUser } from "../interfaces/user";
import * as userRepository from "../repositories/userRepository";

export const isAdmin = async (userId: string): Promise<boolean> => {
  try {
    console.log(`useId no utils is_admin: ${userId}`);
    const user: IUser = await userRepository.getUserById(userId);
    console.log(`Dados do user: ${JSON.stringify(user)}`);
    console.log(user.is_admin);
    return user.is_admin === true;
  } catch (error) {
    console.error("Erro ao verificar se o usuário é admin:", error);
    throw new Error("Falha ao verificar permissão de administrador");
  }
};
