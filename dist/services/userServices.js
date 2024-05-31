"use strict";
// userServices.ts
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
exports.getUserById = exports.getUserByUsername = exports.createUser = void 0;
// Importações
const userRepository = __importStar(require("../repositories/userRepository"));
const validation_1 = require("../utils/validation");
const hashPassword_1 = require("../utils/hashPassword");
// Exporta função que cria usuário
const createUser = (username, email, first_name, last_name, password, squad, is_admin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!username) {
            throw new Error("O username não pode ser vazio");
        }
        if (typeof username !== "string") {
            throw new Error("Tipos de dados inválidos no username, ele deve ser um string");
        }
        if (!(0, validation_1.validateName)(username)) {
            throw new Error("O username deve ter no mínimo 4 caracteres");
        }
        if (!email) {
            throw new Error("O email não pode ser vazio");
        }
        if (typeof email !== "string") {
            throw new Error("Tipos de dados inválidos no email, ele deve ser um string");
        }
        if (!(0, validation_1.validateEmail)(email)) {
            throw new Error("Formato de email inválido. (example@example.com) ");
        }
        if (!first_name) {
            throw new Error("O nome não pode ser vazio");
        }
        if (typeof first_name !== "string") {
            throw new Error("Tipos de dados inválidos no nome, ele deve ser um string");
        }
        if (!last_name) {
            throw new Error("O sobrenome não pode ser vazio");
        }
        if (typeof last_name !== "string") {
            throw new Error("Tipos de dados inválidos no sobrenome, ele deve ser um string");
        }
        if (!password) {
            throw new Error("A senha não pode ser vazia");
        }
        // if (typeof password !== 'string'){
        //     throw new Error({ error: 'Tipos de dados inválidos na senha, ela deve ser uma string' });
        // }
        if (!(0, validation_1.validatePassword)(password)) {
            throw new Error("A senha deve ter no mínimo 8 caracteres sendo ao menos 1 maiúscula e 1 número");
        }
        if (typeof username !== "string") {
            throw new Error("Tipos de dados inválidos no username, ele deve ser um string");
        }
        if (!is_admin) {
            // throw new Error('A informação sobre o cargo de administrados não pode ser vazia');
            is_admin = false;
        }
        if (squad) {
            if (typeof squad !== "number") {
                throw new Error("Tipo de dado inválido na squad, deve ser um número inteiro");
            }
        }
        const existingUser = yield userRepository.getUserByUsername(username);
        if (existingUser.length > 0) {
            throw new Error("Nome de usuário já cadastrado!");
        }
        const existingEmail = yield userRepository.getUserByEmail(email);
        if (existingEmail.length > 0) {
            throw new Error("Email já cadastrado.");
        }
        const hashedPassword = yield (0, hashPassword_1.hashPassword)(password);
        if (!hashedPassword) {
            throw new Error("Erro ao gerar o hash da senha");
        }
        const user = yield userRepository.createUser(username, email, first_name, last_name, hashedPassword, squad, is_admin);
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.createUser = createUser;
// Exporta função que busca usuário pelo username
const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userRepository.getUserByUsername(username);
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.getUserByUsername = getUserByUsername;
// Exporta função que busca usuário pelo ID
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userRepository.getUserById(id);
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.getUserById = getUserById;
