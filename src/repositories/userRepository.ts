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
    console.error("Erro ao criar usuário:", error);
    throw new Error("Falha ao criar usuário");
  }
};

export const getUserByUsername = async (username: string) => {
  const query = "SELECT * FROM users WHERE username=$1";
  try {
    const result = await pool.query(query, [username]);
    return result.rows;
  } catch (error) {
    console.log(error);
    throw new Error("Falha ao localizar o usuário pelo username");
  }
};

export const getUserByEmail = async (email: string) => {
  const query = "SELECT * FROM users WHERE email=$1";
  try {
    const result = await pool.query(query, [email]);
    return result.rows;
  } catch (error) {
    console.log(error);
    throw new Error("Falha ao localizar o usuário pelo email");
  }
};

export const getUserById = async (userId: string): Promise<IUser> => {
  const query =
    "SELECT id, username, email, first_name, last_name, password, team, is_admin FROM users WHERE id = $1";
  try {
    const result = await pool.query(query, [userId]);
    if (result.rows.length === 0) {
      throw new Error(`Usuário com ID ${userId} não encontrado`);
    }
    return result.rows[0] as IUser;
  } catch (error) {
    console.error("Erro ao buscar usuário pelo ID:", error);
    throw new Error("Falha ao buscar usuário pelo ID");
  }
};
