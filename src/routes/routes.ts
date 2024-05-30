import { Router } from "express";
const router = Router();

router.use("/users", usersRoutes);
router.use("/teams", teamsRoutes);
router.use("/login", loginRoutes);
router.use("/logout", logoutRoutes);

export default router;
