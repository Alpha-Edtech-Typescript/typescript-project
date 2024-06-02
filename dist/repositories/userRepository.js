"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUserByEmail = exports.getUserByUsername = exports.createUser = void 0;
const connection_1 = require("../database/connection");
const createUser = (username, email, first_name, last_name, password, team) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "INSERT INTO users (username, email, first_name, last_name, password, team) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    try {
        const result = yield connection_1.pool.query(query, [
            username,
            email,
            first_name,
            last_name,
            password,
            team,
        ]);
        return result.rows[0];
    }
    catch (error) {
        console.error("Erro ao criar usuário:", error);
        throw new Error("Falha ao criar usuário");
    }
});
exports.createUser = createUser;
const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT * FROM users WHERE username=$1";
    try {
        const result = yield connection_1.pool.query(query, [username]);
        return result.rows;
    }
    catch (error) {
        console.log(error);
        throw new Error("Falha ao localizar o usuário pelo username");
    }
});
exports.getUserByUsername = getUserByUsername;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT * FROM users WHERE email=$1";
    try {
        const result = yield connection_1.pool.query(query, [email]);
        return result.rows;
    }
    catch (error) {
        console.log(error);
        throw new Error("Falha ao localizar o usuário pelo email");
    }
});
exports.getUserByEmail = getUserByEmail;
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT id, username, email, first_name, last_name, password, team, is_admin FROM users WHERE id = $1";
    try {
        const result = yield connection_1.pool.query(query, [userId]);
        if (result.rows.length === 0) {
            throw new Error(`Usuário com ID ${userId} não encontrado`);
        }
        return result.rows[0];
    }
    catch (error) {
        console.error("Erro ao buscar usuário pelo ID:", error);
        throw new Error("Falha ao buscar usuário pelo ID");
    }
});
exports.getUserById = getUserById;
