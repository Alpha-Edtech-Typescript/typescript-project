import * as loginServices from "../services/loginServices";
import { Request, Response } from "express";

export const authenticate = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await loginServices.getUser(username);

    if (!user) {
      return res.status(400).json({ error: "User not found." });
    }

    const { auth, token } = await loginServices.authenticateUser(
      username,
      password
    );

    if (auth) {
      const maxAge = 5 * 24 * 60 * 60 * 1000; // 5 dias de duração
      res.cookie("session_id", token, { maxAge, httpOnly: true });
      return res
        .status(200)
        .json({ auth, message: "User successfully authenticated!" });
    }

    return res.status(400).json({ error: "Invalid username and/or password." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Failed to authenticate user, server error." });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    // Deleta o cookie 'session_id'
    res.clearCookie("session_id", { path: "/" });
    return res
      .status(200)
      .json({ success: true, message: "Logout successful." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Failed to logout, server error." });
  }
};
