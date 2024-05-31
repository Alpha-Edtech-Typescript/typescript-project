import { Router } from "express";
import { logout } from "../controllers/loginController";

const router : Router = Router();

router.delete("/" , logout);

export default router;