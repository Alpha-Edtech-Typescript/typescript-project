import { pool } from "../database/connection";
import { ITeam } from "../interfaces/team";

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
