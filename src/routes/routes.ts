// routes.ts

// Importações
import { Router } from "express";
import userRouter from "../routes/userRoutes";
import loginRouter from "../routes/loginRoutes";
import logoutRouter from "../routes/logoutRoutes";

// Cria um novo roteador
const router = Router();

// Definine as rotas e associa os roteadores correspondentes
router.use("/users", userRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);

// Exporta o roteador criado para uso em outros arquivos
export default router;
