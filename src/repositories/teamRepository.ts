import { pool } from "../database/connection";
import { ITeam } from "../interfaces/team";
import { IUser } from "../interfaces/user";

export const createTeam = async (teamName: string, leaderId: string): Promise<ITeam> => {
  const createTeamQuery = "INSERT INTO teams (name, leader) VALUES ($1, $2) RETURNING *";
  const updateUserQuery = "UPDATE users SET team = $1 WHERE id = $2 RETURNING *";

  let client;
  try {
    client = await pool.connect();
    await client.query("BEGIN");

    const { rows } = await client.query(createTeamQuery, [teamName, leaderId]);
    const newTeam = rows[0];
    console.log(newTeam);

    await client.query(updateUserQuery, [newTeam.id, leaderId]);

    await client.query("COMMIT");
    
    return newTeam;
  } catch (error: any) {
    if (client) {
      await client.query("ROLLBACK");
    }
    throw new Error("Failed to create a new team.");
  } finally {
    if (client) {
      client.release();
    }
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

export const updateTeam = async (teamId: string, newTeam: Partial<ITeam>): Promise<ITeam> => {
  try {
    const { name, leaderId } = newTeam;
    const result = await pool.query(
      `UPDATE teams SET name = $1, leader = $2 WHERE id = $3 RETURNING *;`,
      [name, leaderId, teamId]
    );
    return result.rows[0] as ITeam;
  } catch (error: any) {
    console.error("Error updating team:", error);
    throw new Error("Failed to update team.");
  }
};

export const updateUserTeam = async (user_id: string, team_id: string | null): Promise<IUser> => {
  const updateUserTeamQuery = "UPDATE users SET team = $1 WHERE id = $2 RETURNING *";
  
  try {
    const { rows } = await pool.query(updateUserTeamQuery, [team_id, user_id]);
    const updatedUser = rows[0];
    
    return updatedUser;
  } catch (error: any) {
    console.error("Error updating user's team:", error);
    throw new Error("Failed to update user's team.");
  }
};
