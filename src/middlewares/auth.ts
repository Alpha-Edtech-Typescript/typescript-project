import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.session_id;

  if (!token) return res.status(401).json({ message: "Access Denied" });

  jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
    if (err) {
      return res.status(400).json({ message: "Invalid jwt Token" });
    }

    req.user = decoded.id; // Aqui definimos a propriedade user
    next();
  });
};

// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// export const authenticateJWT = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const token = req.cookies.session_id;

//   if (!token) return res.status(403).json({ message: "Acesso negado" });

//   jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
//     if (err) {
//       return res.status(400).json({ message: "Token jwt inválido" });
//     }

//     req.user = decoded.id;
//     next();
//   });
// };
