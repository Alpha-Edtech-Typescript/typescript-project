import { Router } from "express";
import userRouter from "../routes/userRoutes";
// import squadRouter from "../routes/squadRoutes";
import loginRouter from "../routes/loginRoutes";
import logoutRouter from "../routes/logoutRoutes";

const router = Router();

router.use("/users", userRouter);
// router.use("/squad", squadRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);

export default router;
