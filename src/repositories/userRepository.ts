import { pool } from "../database/connection";



export const createUser = async (username: string, email: string, first_name:string, last_name: string, password:string, squad:number, is_admin:boolean ) => {
    const query = 'INSERT INTO users (username, email, first_name, last_name, password, squad, is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    try {
        const result = await pool.query(query, [username, email, first_name, last_name, password, squad, is_admin]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw new Error('Falha ao criar usuário');
    }
};

export const getUserByUsername = async (username: string) =>{
    const query = 'SELECT * FROM users WHERE username=$1';
    try{
        const result = await pool.query(query,[username]);
        return result.rows; 
    }catch(error){
        console.log(error);
        throw new Error('Falha ao localizar o usuário pelo username');
    } 
}

export const getUserByEmail = async (email: string) =>{
    const query = 'SELECT * FROM users WHERE email=$1';
    try{
        const result = await pool.query(query,[email]);
        return result.rows; 
    }catch(error){
        console.log(error);
        throw new Error('Falha ao localizar o usuário pelo email');
    } 
}