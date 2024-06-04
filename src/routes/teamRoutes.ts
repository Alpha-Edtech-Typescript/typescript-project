import { Router } from "express";
import * as teamController from "../controllers/teamController";
import { authenticateJWT } from "../middlewares/auth";

const router: Router = Router();

router.post("/", authenticateJWT, teamController.createTeam);
router.get("/", authenticateJWT, teamController.getAllTeams);
router.get("/:teamId", teamController.getTeamById);
router.delete("/:teamId", teamController.deleteTeam);
router.get("/:teamId/members", teamController.getUsersByTeamId);
router.patch("/:teamId", authenticateJWT, teamController.updateTeam);

export default router;
