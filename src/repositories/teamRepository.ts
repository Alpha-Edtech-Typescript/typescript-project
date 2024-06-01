import { pool } from "../database/connection";
import { ITeam } from "../interfaces/team";

export const createTeam = async (team: ITeam): Promise<ITeam> => {
  const query = "INSERT INTO teams (name, leader) VALUES ($1, $2) RETURNING *";
  const values = [team.name, team.leaderId];
  try {
    const result = await pool.query(query, values);
    return result.rows[0] as ITeam;
  } catch (error: any) {
    console.log("Falha ao criar uma nova equipe", error);
    throw new Error("Falha ao criar uma nova equipe");
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
    console.error("Erro ao buscar equipe pelo nome:", error);
    throw new Error("Falha ao buscar equipe pelo nome");
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
    console.error("Erro ao buscar equipe pelo ID do líder:", error);
    throw new Error("Falha ao buscar equipe pelo ID do líder");
  }
};
