// loginRoutes.ts

// Importações
import { Router } from "express";
import { authenticate } from "../controllers/loginController";

// Cria um novo roteador
const router: Router = Router();

// Definine a rota POST para autenticação e associa a função de autenticação do controlador
router.post("/", authenticate);

// Exporta o roteador criado para uso em outros arquivos
export default router;
