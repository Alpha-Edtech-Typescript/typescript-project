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
exports.logout = exports.authenticate = void 0;
const loginServices = __importStar(require("../services/loginServices"));
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield loginServices.getUser(username);
        if (!user) {
            return res.status(400).json({ error: "Usuário não encontrado" });
        }
        const { auth, token } = yield loginServices.authenticateUser(username, password);
        if (auth) {
            const maxAge = 5 * 24 * 60 * 60 * 1000; // 5 dias de duração
            res.cookie("session_id", token, { maxAge, httpOnly: true });
            return res
                .status(200)
                .json({ auth, message: "Usuário autenticado com sucesso!" });
        }
        return res.status(400).json({ error: "Usuário e/ou senha inválidos" });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: "Falha ao autenticar usuário, erro no servidor" });
    }
});
exports.authenticate = authenticate;
const logout = (req, res) => {
    try {
        // Deleta o cookie 'session_id'
        res.clearCookie("session_id", { path: "/" });
        return res
            .status(200)
            .json({ success: true, message: "Logout realizado com sucesso" });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: "Falha ao realizar logout, erro no servidor" });
    }
};
exports.logout = logout;
