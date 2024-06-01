import { Router } from "express";
import userRouter from "../routes/userRoutes";
import teamRouter from "../routes/teamRoutes";
import loginRouter from "../routes/loginRoutes";
import logoutRouter from "../routes/logoutRoutes";

const router = Router();

router.use("/users", userRouter);
router.use("/teams", teamRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);

export default router;
