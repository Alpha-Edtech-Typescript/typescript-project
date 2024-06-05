import { Request, Response } from "express";
import * as userServices from "../services/userServices";
import { IAPIResponse } from "../interfaces/api";
import { IUser } from "../interfaces/user";
import { isAdmin } from "../utils/isAdmin";
import { isLeader } from "../utils/isLeader";
import { isAnyLeader } from "../utils/isAnyLeader";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const response: IAPIResponse<IUser[]> = { success: false };
  try {
    const users: IUser[] = await userServices.getAllUsers();
    response.data = users;
    response.success = true;
    response.message = "Users retrieved successfully";
    res.status(200).json(response);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ data: null, error: "Internal server erro" });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const response: IAPIResponse<IUser> = { success: false };
  try {
    const loggedUser = String(req.user);
    const adminLogged = await isAdmin(loggedUser);
    const leaderLogged = await isAnyLeader(loggedUser);

    if (!adminLogged && !leaderLogged) {
      throw new Error(
        "Permission denied, you need to be an admin or a leader."
      );
    }

    const userId = req.params.userId;
    const user: IUser = await userServices.getUserById(userId);
    response.data = user;
    response.success = true;
    response.message = "User retrieved successfully";
    res.status(200).json(response);
  } catch (error: any) {
    console.error(error);
    res.status(403).json({
      data: null,
      error: "Permission denied, you need to be an admin or a leader.",
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const response: IAPIResponse<IUser> = { success: false };
  try {
    const { username, email, first_name, last_name, password, team } = req.body;

    const user = await userServices.createUser(
      username,
      email,
      first_name,
      last_name,
      password,
      team
    );
    response.data = user;
    response.success = true;
    response.message = "User successfully registered!";
    res.status(201).json(response);
  } catch (error: any) {
    response.error = error.message;
    response.message = "Failed to register the user!";
    return res.status(400).json(response);
  }
};

export const getUserMe = async (req: Request, res: Response) => {
  const response: IAPIResponse<IUser> = { success: false };
  try {
    const userId = req.user ?? "";
    if (!userId) {
      throw new Error("User ID not found.");
    }
    const user = await userServices.getUserById(userId);
    response.success = true;
    response.data = user;
    response.message = "User found successfully!";
    res.status(200).json(response);
  } catch (error: any) {
    response.error = error.message;
    response.message = "Unable to find information!";
    return res.status(500).json(response);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const response: IAPIResponse<IUser> = { success: false };
  try {
    const userId = req.params.userId;
    const user: IUser = await userServices.deleteUser(userId);
    response.data = user;
    response.success = true;
    response.message = "User deleted successfully!";
    res.status(200).json(response);
  } catch (error: any) {
    console.error(error);
    response.message = "Unable to delete user!";
    res.status(500).json({ data: null, error: "Internal server erro" });
  }
};  

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const response: IAPIResponse<IUser> = { success: false };
  try {
    const userId = req.params.userId;
    const fields: Partial<IUser> = req.body;

    const userLoggedId = req.user;

    if (!userLoggedId) throw new Error("You are not logged in");
    
    const isAdminUser = await isAdmin(userLoggedId);

    const isLeaderUser = await isAnyLeader(userId);

    const isUpdatingSelf  = (userLoggedId === userId);

    if (isUpdatingSelf) {
      const updatedUser: IUser = await userServices.updateUser(userId, fields);
      response.data = updatedUser;
      response.success = true;
      response.message = "User updated successfully!";
      res.json(response);
    } else if (!isUpdatingSelf && !isLeaderUser && isAdminUser) {
      const promotedUser: IUser = await userServices.makeUserAdmin(userId);
      response.data = promotedUser;
      response.success = true;
      response.message = "User promoted successfully!";
      res.json(response);
    }  else if (!isUpdatingSelf && isLeaderUser && isAdminUser) {
      throw new Error(" User cannot be promoted to administrator ")
    } else if (!isUpdatingSelf && !isAdminUser) {
      throw new Error(" You are not allowed to change another user's ID ")
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || "Unable to complete the operation" });
  }
};