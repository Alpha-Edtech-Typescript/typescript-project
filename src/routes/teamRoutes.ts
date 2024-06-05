import { Router } from "express";
import * as teamController from "../controllers/teamController";
import { authenticateJWT } from "../middlewares/auth";

const router: Router = Router();

router.post("/", authenticateJWT, teamController.createTeam);
router.get("/", authenticateJWT, teamController.getAllTeams);
router.get("/:teamId", authenticateJWT, teamController.getTeamById);
router.delete("/:teamId", authenticateJWT, teamController.deleteTeam);
router.get("/:teamId/members", authenticateJWT, teamController.getUsersByTeamId);
router.patch("/:teamId", authenticateJWT, teamController.updateTeam);
//Parte nova do Murilo para testar
router.post("/:team_id/member/:user_id", authenticateJWT, teamController.addMember);
router.delete("/:team_id/member/:user_id", authenticateJWT, teamController.removeMember);

export default router;
