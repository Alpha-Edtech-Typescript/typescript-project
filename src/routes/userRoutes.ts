import { Router } from "express";
import * as userController from "../controllers/userController";
import * as auth from "../middlewares/auth";

const router : Router = Router();


router.post('/', userController.createUser);

export default router;