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
const teamServices = __importStar(require("../services/teamServices"));
const createTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = { success: false };
    try {
        const { name, leaderId } = req.body;
        const userId = req.user;
        if (!userId) {
            throw new Error("Usuário não autenticado");
        }
        const team = yield teamServices.createTeam(userId, name, leaderId);
        response.data = team;
        response.message = "Time criado com sucesso!";
        res.status(201).json(response);
    }
    catch (error) {
        response.error = error.message;
        return res.status(400).json(response);
    }
});
exports.createTeam = createTeam;
const getAllTeams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teams = yield teamServices.getAllTeams();
        const response = {
            success: true,
            data: teams,
            message: "Teams retrieved successfully",
        };
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ data: null, error: "Internal server erro" });
    }
});
exports.getAllTeams = getAllTeams;
const getTeamById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const team = yield teamServices.getTeamById(Number(req.params.id));
        res.json({ data: team, error: null });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ data: null, error: "Internal server error" });
    }
});
exports.getTeamById = getTeamById;
const deleteTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTeam = yield teamServices.deleteTeam(Number(req.params.id));
        res.json({ data: deletedTeam, error: null });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ data: null, error: "Internal server error" });
    }
});
exports.deleteTeam = deleteTeam;
