"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteTeam = exports.getTeamById = exports.getAllTeams = exports.createTeam = void 0;
const teamRepository = __importStar(require("../repositories/teamRepository"));
const userRepository = __importStar(require("../repositories/userRepository"));
const isAdmin_1 = require("../utils/isAdmin");
const createTeam = (userId, teamName, leaderId) => __awaiter(void 0, void 0, void 0, function* () {
    const isAdminUser = yield (0, isAdmin_1.isAdmin)(userId);
    if (!isAdminUser) {
        throw new Error("Apenas administradores podem criar equipes.");
    }
    // Verifica se o líder existe
    const leader = yield userRepository.getUserById(leaderId);
    if (!leader) {
        throw new Error("Líder não encontrado.");
    }
    // Verifica se o líder já é líder de outra equipe
    const existingTeam = yield teamRepository.getTeamByLeaderId(leaderId);
    if (existingTeam) {
        throw new Error("O usuário já é líder de outra equipe.");
    }
    // Verifica se o nome da equipe já existe
    const existingTeamByName = yield teamRepository.getTeamByName(teamName);
    if (existingTeamByName) {
        throw new Error("O nome da equipe já está em uso.");
    }
    // Cria uma nova equipe, não mandei o id por que ele vai ser gerado pelo banco
    const newTeam = {
        name: teamName,
        leaderId: leaderId,
    };
    return yield teamRepository.createTeam(newTeam);
});
exports.createTeam = createTeam;
const getAllTeams = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield teamRepository.getAllTeams();
});
exports.getAllTeams = getAllTeams;
const getTeamById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield teamRepository.getTeamById(id);
});
exports.getTeamById = getTeamById;
const deleteTeam = (teamId) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield teamRepository.getTeamById(teamId);
    if (!team)
        throw new Error("Team not found");
    return yield teamRepository.deleteTeam(teamId);
});
exports.deleteTeam = deleteTeam;
