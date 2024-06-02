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
exports.getUserMe = exports.createUser = void 0;
const userServices = __importStar(require("../services/userServices"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = { success: false };
    try {
        const { username, email, first_name, last_name, password, team } = req.body;
        const user = yield userServices.createUser(username, email, first_name, last_name, password, team);
        response.data = user;
        response.success = true;
        response.message = "Usuário cadastrado com sucesso!";
        res.status(201).json(response);
    }
    catch (error) {
        response.message = "Não foi possível cadastrar o usuário!";
        response.error = error.message;
        return res.status(400).json(response);
    }
});
exports.createUser = createUser;
const getUserMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const response = { success: false };
    try {
        const userId = (_a = req.user) !== null && _a !== void 0 ? _a : '';
        if (!userId) {
            throw new Error('ID do usuário não encontrado');
        }
        const user = yield userServices.getUserById(userId);
        response.success = true;
        response.data = user;
        res.status(200).json(response);
    }
    catch (error) {
        response.error = error.message;
        response.message = "Não foi possível encontrar as suas informações!";
        return res.status(500).json(response);
    }
});
exports.getUserMe = getUserMe;
