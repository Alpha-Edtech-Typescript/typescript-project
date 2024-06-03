import { Router } from "express";
import * as userController from "../controllers/userController";
import * as auth from "../middlewares/auth";
import adminOnly from "../middlewares/adminOnly";

const router: Router = Router();

router.post("/", userController.createUser);
router.get("/me", auth.authenticateJWT, userController.getUserMe);
router.get("/", auth.authenticateJWT, adminOnly, userController.getAllUsers);
router.get(
  "/:userId",
  auth.authenticateJWT,
  adminOnly,
  userController.getUserById,
);
router.delete(
  "/:userId",
  auth.authenticateJWT,
  adminOnly,
  userController.deleteUser,
);

export default router;
