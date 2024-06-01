import { Router } from "express";
import * as teamController from "../controllers/teamController";
<<<<<<< HEAD
import { authenticateJWT } from "../middlewares/auth";

const router: Router = Router();

router.post("/", authenticateJWT, teamController.createTeam);
=======

const router: Router = Router();

router.get("/", teamController.getAllTeams);
router.get("/", teamController.getTeamById);
router.delete("/", teamController.deleteTeam);
>>>>>>> af3c34622fc9bdcaa7fe6b91181766c22e9783e7

export default router;
