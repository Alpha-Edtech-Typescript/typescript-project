"use strict";
// userController.ts
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
const userService = __importStar(require("../services/userServices"));
// Função que cria um novo usuário
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = { success: false };
    try {
        const { username, email, first_name, last_name, password, squad, is_admin, } = req.body;
        // Descomente as validações conforme necessário
        // if(!username){
        //     return res.status(400).json({ error: 'O username não pode ser vazio' });
        // }
        // if (typeof username !== 'string'){
        //     return res.status(400).json({ error: 'Tipos de dados inválidos no username, ele deve ser um string' });
        // }
        // if(!email){
        //     return res.status(400).json({ error: 'O email não pode ser vazio' });
        // }
        // if (typeof email !== 'string'){
        //     return res.status(400).json({ error: 'Tipos de dados inválidos no email, ele deve ser um string' });
        // }
        // if(!first_name){
        //     return res.status(400).json({ error: 'O nome não pode ser vazio' });
        // }
        // if (typeof first_name !== 'string'){
        //     return res.status(400).json({ error: 'Tipos de dados inválidos no nome, ele deve ser um string' });
        // }
        // if(!last_name){
        //     return res.status(400).json({ error: 'O sobrenome não pode ser vazio' });
        // }
        // if (typeof last_name !== 'string'){
        //     return res.status(400).json({ error: 'Tipos de dados inválidos no sobrenome, ele deve ser um string' });
        // }
        // if(!password){
        //     return res.status(400).json({ error: 'A senha não pode ser vazia' });
        // }
        // if (typeof password !== 'string'){
        //     return res.status(400).json({ error: 'Tipos de dados inválidos na senha, ela deve ser uma string' });
        // }
        // if (typeof username !== 'string'){
        //     return res.status(400).json({ error: 'Tipos de dados inválidos no username, ele deve ser um string' });
        // }
        // if(!is_admin){
        //     return res.status(400).json({ error: 'A informação sobre o cargo de administrados não pode ser vazia' });
        // }
        // if(squad){
        //     if(typeof squad !== 'number'){
        //         return res.status(400).json({ error: 'Tipos de dados inválidos na squad, ela deve ser um número inteiro' });
        //     }
        // }
        // Cria o usuário com os dados fornecidos
        const user = yield userService.createUser(username, email, first_name, last_name, password, squad, is_admin);
        response.success = true;
        response.data = user;
        response.message = "Usuário cadastrado com sucesso!";
        res.status(201).json(response);
    }
    catch (error) {
        response.error = error.message;
        response.message = "Não foi possível cadastrar o usuário";
        return res.status(400).json(response);
    }
});
exports.createUser = createUser;
// Função que obtém dados do usuário autenticado
const getUserMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = { success: false };
    try {
        const { id } = req.user;
        const user = yield userService.getUserById(id);
        response.success = true;
        response.data = user[0];
        res.status(200).json(response);
    }
    catch (error) {
        response.error = error.message;
        return res.status(500).json(response);
    }
});
exports.getUserMe = getUserMe;
