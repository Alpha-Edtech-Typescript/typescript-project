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
    console.log(error);
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
    throw new Error("Failed to locate the user by username.");
  }
};

export const getUserByEmail = async (email: string) => {
  const query = "SELECT * FROM users WHERE email=$1";
  try {
    const result = await pool.query(query, [email]);
    return result.rows;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to locate the user by email.");
  }
};

export const getUserById = async (userId: string): Promise<IUser> => {
  try {
    const result = await pool.query(
      `
      SELECT 
        id, 
        username, 
        email, 
        first_name AS "firstName", 
        last_name AS "lastName", 
        is_admin AS "isAdmin", 
        team AS "teamId"
      FROM users WHERE id = $1
    `,
      [userId]
    );
    if (result.rows.length === 0) {
      throw new Error(`User with ID ${userId} not found.`);
    }
    return result.rows[0] as IUser;
  } catch (error) {
    console.error("Error while fetching user by ID:", error);
    throw new Error("Failed to retrieve user by ID.");
  }
};

export const getUsersByTeamId = async (teamId: string): Promise<IUser[]> => {
  const query = "SELECT * FROM users WHERE team = $1";
  try {
    const result = await pool.query(query, [teamId]);
    return result.rows as IUser[];
  } catch (error: any) {
    console.error("Error fetching users by teamId:", error);
    throw new Error("Failed to fetch users by teamId");
  }
};

export const deleteUserById = async (userId: string): Promise<IUser> => {
  try {
    // Primeiro, obtenha os dados do usuário
    const userResult = await pool.query(
      `
      SELECT 
        id, 
        username, 
        email, 
        first_name AS "firstName", 
        last_name AS "lastName", 
        is_admin AS "isAdmin", 
        team AS "teamId"
      FROM users WHERE id = $1
    `,
      [userId]
    );

    if (userResult.rows.length === 0) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    const user = userResult.rows[0] as IUser;

    // Em seguida, exclua o usuário
    const deleteResult = await pool.query(
      `
      DELETE FROM users WHERE id = $1
    `,
      [userId]
    );

    if (deleteResult.rowCount === 0) {
      throw new Error(`Failed to delete user with ID ${userId}.`);
    }

    // Retorne os dados do usuário deletado
    return user;
  } catch (error) {
    console.error("Error while deleting user by ID:", error);
    throw new Error("Failed to delete user by ID.");
  }
};

//Parte nova do Murilo para testar
export const updateUser = async (user: IUser): Promise<IUser> => {
  const query = `
    UPDATE users
    SET username = $1, email = $2, first_name = $3, last_name = $4, password = $5, teamId = $6, is_admin = $7
    WHERE id = $8
    RETURNING *;
  `;
  const values = [
    user.username,
    user.email,
    user.firstName,
    user.lastName,
    user.password,
    user.teamId,
    user.isAdmin,
    user.id,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};
