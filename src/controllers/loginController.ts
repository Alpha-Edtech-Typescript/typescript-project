import * as loginServices from "../services/loginServices";
import { Request, Response } from "express";

export const authenticate = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await loginServices.getUser(username);

    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const { auth, token } = await loginServices.authenticateUser(
      username,
      password,
    );

    if (auth) {
      const maxAge = 5 * 24 * 60 * 60 * 1000; // 5 dias de duração
      res.cookie("session_id", token, { maxAge, httpOnly: true });
      return res
        .status(200)
        .json({ auth, message: "Usuário autenticado com sucesso!" });
    }

    return res.status(400).json({ error: "Usuário e/ou senha inválidos" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Falha ao autenticar usuário, erro no servidor" });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    // Deleta o cookie 'session_id'
    res.clearCookie("session_id", { path: "/" });
    return res
      .status(200)
      .json({ success: true, message: "Logout realizado com sucesso" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Falha ao realizar logout, erro no servidor" });
  }
};
