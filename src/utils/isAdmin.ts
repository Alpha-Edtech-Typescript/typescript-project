import { IUser } from "../interfaces/user";
import * as userRepository from "../repositories/userRepository";

export const isAdmin = async (userId: string): Promise<boolean> => {
  try {
    const user: IUser = await userRepository.getUserById(userId);
    return user.isAdmin === true;
  } catch (error) {
    console.error("Error checking if the user is an admin:", error);
    throw new Error("Failed checking if the user is an admin.");
  }
};
