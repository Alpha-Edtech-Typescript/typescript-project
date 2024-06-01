import { pool } from "../database/connection";
import { ITeam } from "../interfaces/team";

export const getAllTeams = async (): Promise<ITeam[]> => {
  try {
    const { rows } = await pool.query("SELECT id, name, leader FROM teams");
    return rows;
  } catch (error: any) {
    console.log(error);
    throw new Error("Error updating teams");
  }
};

export const getTeamById = async (teamId: number): Promise<ITeam> => {
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
  leaderId: string,
): Promise<ITeam | null> => {
  const query = "SELECT * FROM teams WHERE leader_id = $1";
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

export const deleteTeam = async (teamId: number): Promise<ITeam> => {
  try {
    const { rows } = await pool.query(
      "DELETE FROM teams WHERE id = $1 RETURNING *",
      [teamId],
    );
    return rows[0];
  } catch (error: any) {
    throw new Error("Error deleting teams");
  }
};
