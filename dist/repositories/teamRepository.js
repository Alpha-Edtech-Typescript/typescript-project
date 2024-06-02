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
exports.deleteTeam = exports.getTeamByLeaderId = exports.getTeamById = exports.getAllTeams = exports.getTeamByName = exports.createTeam = void 0;
const connection_1 = require("../database/connection");
const createTeam = (team) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "INSERT INTO teams (name, leader) VALUES ($1, $2) RETURNING *";
    const values = [team.name, team.leaderId];
    try {
        const result = yield connection_1.pool.query(query, values);
        return result.rows[0];
    }
    catch (error) {
        console.log("Falha ao criar uma nova equipe", error);
        throw new Error("Falha ao criar uma nova equipe");
    }
});
exports.createTeam = createTeam;
const getTeamByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT * FROM teams WHERE name = $1";
    try {
        const result = yield connection_1.pool.query(query, [name]);
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    }
    catch (error) {
        console.error("Erro ao buscar equipe pelo nome:", error);
        throw new Error("Falha ao buscar equipe pelo nome");
    }
});
exports.getTeamByName = getTeamByName;
const getAllTeams = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield connection_1.pool.query("SELECT id, name, leader FROM teams");
        return rows;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error updating teams");
    }
});
exports.getAllTeams = getAllTeams;
const getTeamById = (teamId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield connection_1.pool.query("SELECT * FROM teams WHERE id = $1", [
            teamId,
        ]);
        return rows[0];
    }
    catch (error) {
        throw new Error("Error updating teams");
    }
});
exports.getTeamById = getTeamById;
const getTeamByLeaderId = (leaderId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT * FROM teams WHERE leader = $1";
    try {
        const result = yield connection_1.pool.query(query, [leaderId]);
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    }
    catch (error) {
        console.error("Erro ao buscar equipe pelo ID do líder:", error);
        throw new Error("Falha ao buscar equipe pelo ID do líder");
    }
});
exports.getTeamByLeaderId = getTeamByLeaderId;
const deleteTeam = (teamId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield connection_1.pool.query("DELETE FROM teams WHERE id = $1 RETURNING *", [teamId]);
        return rows[0];
    }
    catch (error) {
        throw new Error("Error deleting teams");
    }
});
exports.deleteTeam = deleteTeam;
