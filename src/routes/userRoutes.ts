import { Router } from "express";
import * as userController from "../controllers/userController";
import * as auth from "../middlewares/auth";

const router: Router = Router();

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getUserById);
router.get("/me", auth.authenticateJWT, userController.getUserMe);

export default router;
