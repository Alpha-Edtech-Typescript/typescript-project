import { Router } from "express";
import * as teamController from "../controllers/teamController";
import { authenticateJWT } from "../middlewares/auth";

const router: Router = Router();

router.post("/", authenticateJWT, teamController.createTeam);
router.get("/", teamController.getAllTeams);
router.get("/:teamId", teamController.getTeamById);
router.delete("/:teamId", teamController.deleteTeam);
router.get("/:teamId/members", teamController.getUsersByTeamId);

export default router;
