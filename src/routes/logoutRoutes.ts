// logoutRoutes.ts

// Importações
import { Router } from "express";
import { logout } from "../controllers/loginController";

// Cria um novo roteador
const router: Router = Router();

// Define a rota DELETE para logout e associa a função de logout do controlador
router.delete("/", logout);

// Exporta o roteador criado para uso em outros arquivos
export default router;
