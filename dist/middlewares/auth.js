"use strict";
// auth.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Exporta função que verifica autenticidade do JWT Token
const authenticateJWT = (req, res, next) => {
    const token = req.cookies.session_id;
    if (!token)
        return res.status(401).json({ message: "Access Denied" });
    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(400).json({ message: "Invalid jwt Token" });
        }
        req.user = decoded;
        next();
    });
};
exports.authenticateJWT = authenticateJWT;
