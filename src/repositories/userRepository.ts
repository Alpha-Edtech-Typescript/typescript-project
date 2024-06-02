import { pool } from "../database/connection";
import { IUser } from "../interfaces/user";

export const getAllUsers = async (): Promise<IUser[]> => {
  try {
      const { rows } = await pool.query(`
        SELECT 
          id, 
          username, 
          email, 
          first_name AS "firstName", 
          last_name AS "lastName", 
          is_admin AS "isAdmin", 
          team AS "teamId"
        FROM users
      `);
      return rows;
  } catch (error: any) {
      console.log(error)
      throw new Error("Error updating users");
  }
};

export const createUser = async (
  username: string,
  email: string,
  first_name: string,
  last_name: string,
  password: string,
  team: string
) => {
  const query =
    "INSERT INTO users (username, email, first_name, last_name, password, team) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
  try {
    const result = await pool.query(query, [
      username,
      email,
      first_name,
      last_name,
      password,
      team,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user.");
  }
};

export const getUserByUsername = async (username: string) => {
  const query = "SELECT * FROM users WHERE username=$1";
  try {
    const result = await pool.query(query, [username]);
    return result.rows;
  } catch (error) {
    console.log(error);
    throw new Error("Failure to locate the user by username.");
  }
};

export const getUserByEmail = async (email: string) => {
  const query = "SELECT * FROM users WHERE email=$1";
  try {
    const result = await pool.query(query, [email]);
    return result.rows;
  } catch (error) {
    console.log(error);
    throw new Error("Failure to locate the user by email.");
  }
};

export const getUserById = async (userId: string): Promise<IUser> => {
  try {
    const result = await pool.query(`
      SELECT 
        id, 
        username, 
        email, 
        first_name AS "firstName", 
        last_name AS "lastName", 
        is_admin AS "isAdmin", 
        team AS "teamId"
      FROM users WHERE id = $1
    `, [userId]);
    if (result.rows.length === 0) {
      throw new Error(`User with ID ${userId} not found.`);
    }
    return result.rows[0] as IUser;
  } catch (error) {
    console.error("Error while fetching user by ID:", error);
    throw new Error("Failure to retrieve user by ID.");
  }
};
