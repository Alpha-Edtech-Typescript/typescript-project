// auth.ts

// Importações
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Exporta função que verifica autenticidade do JWT Token
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

		(req as any).user = decoded;
		next();
	});
};
