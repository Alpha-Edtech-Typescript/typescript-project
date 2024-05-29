import { Router } from "express";
const router = Router();

router.use("/users", usersRoutes);
router.use("/teams", teamsRoutes);

export default router;
