import { pool } from "../database/connection";
import { ITeam } from "../interfaces/team";
import { IUser } from "../interfaces/user";

export const createTeam = async (team: ITeam): Promise<ITeam> => {
  const query = "INSERT INTO teams (name, leader) VALUES ($1, $2) RETURNING *";
  const values = [team.name, team.leaderId];
  try {
    const result = await pool.query(query, values);
    return result.rows[0] as ITeam;
  } catch (error: any) {
    console.log("Failed to create a new team.", error);
    throw new Error("Failed to create a new team.");
  }
};

export const getTeamByName = async (name: string): Promise<ITeam | null> => {
  const query = "SELECT * FROM teams WHERE name = $1";
  try {
    const result = await pool.query(query, [name]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0] as ITeam;
  } catch (error) {
    console.error("Error fetching team by name:", error);
    throw new Error("Failed fetching team by name");
  }
};

export const getAllTeams = async (): Promise<ITeam[]> => {
  try {
    const { rows } = await pool.query("SELECT id, name, leader FROM teams");
    return rows;
  } catch (error: any) {
    console.log(error);
    throw new Error("Error updating teams");
  }
};

export const getTeamById = async (teamId: string): Promise<ITeam> => {
  try {
    const { rows } = await pool.query("SELECT * FROM teams WHERE id = $1", [
      teamId,
    ]);
    return rows[0];
  } catch (error: any) {
    throw new Error("Error updating teams");
  }
};

export const getTeamByLeaderId = async (
  leaderId: string
): Promise<ITeam | null> => {
  const query = "SELECT * FROM teams WHERE leader = $1";
  try {
    const result = await pool.query(query, [leaderId]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0] as ITeam;
  } catch (error) {
    console.error("Error fetching team by leader ID.:", error);
    throw new Error("Failed fetching team by leader ID.");
  }
};

export const deleteTeam = async (teamId: string): Promise<ITeam> => {
  try {
    const { rows } = await pool.query(
      "DELETE FROM teams WHERE id = $1 RETURNING *",
      [teamId]
    );
    return rows[0];
  } catch (error: any) {
    throw new Error("Error deleting teams");
  }
};

export const getUsersByTeamId = async (teamId: string): Promise<IUser[]> => {
  const query = "SELECT * FROM users WHERE teamId = $1";
  try {
    const result = await pool.query(query, [teamId]);
    return result.rows as IUser[];
  } catch (error: any) {
    console.error("Error fetching users by teamId:", error);
    throw new Error("Failed to fetch users by teamId");
  }
};
