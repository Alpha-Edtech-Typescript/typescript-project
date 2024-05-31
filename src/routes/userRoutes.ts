// userRoutes.ts

// Importações
import { Router } from "express";
import * as userController from "../controllers/userController";
import * as auth from "../middlewares/auth";

// Cria um novo roteador
const router: Router = Router();

// Define as rotas e associa os roteadores correspondentes
router.post("/", userController.createUser);
router.get("/me", auth.authenticateJWT, userController.getUserMe);

// Exporta o roteador criado para uso em outros arquivos
export default router;
