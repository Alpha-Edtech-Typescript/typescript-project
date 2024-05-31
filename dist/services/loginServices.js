"use strict";
// loginServices.ts
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByUsername = exports.authenticateUser = exports.getUser = void 0;
// Importações
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Para gerar tokens JWT
const comparePassword_1 = require("../utils/comparePassword"); // Para comparar senhas
const config_1 = require("../config"); // Chave secreta para assinar tokens
const userRepository = __importStar(require("../repositories/userRepository")); // Repositório de usuários
// Função que obtém um usuário pelo nome de usuário
const getUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userRepository.getUserByUsername(username);
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.getUser = getUser;
// Função que autentica um usuário com nome de usuário e senha
const authenticateUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userRepository.getUserByUsername(username);
        if (user && user.length > 0) {
            const matchPassword = yield (0, comparePassword_1.comparePassword)(password, user[0].password);
            if (matchPassword) {
                const token = jsonwebtoken_1.default.sign({
                    id: user[0].id,
                    // Adicione outras informações do usuário conforme necessário
                }, config_1.SECRET_KEY, { expiresIn: "5d" });
                return { auth: true, token };
            }
        }
        return { auth: false, error: "Usuário e/ou senha inválidos" };
    }
    catch (error) {
        console.log(error);
        throw new Error("Falha na autenticação do usuário");
    }
});
exports.authenticateUser = authenticateUser;
// Exporta função que busca usuário pelo username
function getUserByUsername(username) {
    throw new Error("Function not implemented.");
}
exports.getUserByUsername = getUserByUsername;
