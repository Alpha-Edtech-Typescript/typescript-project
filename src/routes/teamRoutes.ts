import { Router } from "express";
import * as teamController from "../controllers/teamController";
import { authenticateJWT } from "../middlewares/auth";

const router: Router = Router();

router.post("/", authenticateJWT, teamController.createTeam);
router.get("/", teamController.getAllTeams);
router.get("/", teamController.getTeamById);
router.delete("/", teamController.deleteTeam);

export default router;
