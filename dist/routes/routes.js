"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const teamRoutes_1 = __importDefault(require("../routes/teamRoutes"));
const loginRoutes_1 = __importDefault(require("../routes/loginRoutes"));
const logoutRoutes_1 = __importDefault(require("../routes/logoutRoutes"));
const router = (0, express_1.Router)();
router.use("/users", userRoutes_1.default);
router.use("/teams", teamRoutes_1.default);
router.use("/login", loginRoutes_1.default);
router.use("/logout", logoutRoutes_1.default);
exports.default = router;
