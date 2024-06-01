import { Router } from "express";
import * as teamController from "../controllers/teamController";

const router: Router = Router();

router.get("/", teamController.getAllTeams);
router.get("/", teamController.getTeamById);
router.delete("/", teamController.deleteTeam);

export default router;
