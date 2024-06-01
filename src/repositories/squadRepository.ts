import { pool } from "../database/connection";
import { ISquad } from "../interfaces/squad";

export const getSquadByLeaderId = async (leaderId: string): Promise<ISquad | null> => {
    const query = 'SELECT * FROM squads WHERE leader_id = $1';
    try {
        const result = await pool.query(query, [leaderId]);
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0] as ISquad;
    } catch (error) {
        console.error('Erro ao buscar equipe pelo ID do líder:', error);
        throw new Error('Falha ao buscar equipe pelo ID do líder');
    }
};
