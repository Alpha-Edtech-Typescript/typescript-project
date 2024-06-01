import { Request, Response } from "express";
import * as teamService from "../services/teamService";
import { IAPIResponse } from "../interfaces/api";
import { ITeam } from "../interfaces/team";
import { isAdmin } from "../utils/isAdmin";
import { isLeader } from "../utils/isLeader";

export const getAllTeams = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const teams: ITeam[] = await teamService.getAllTeams();
        const response: IAPIResponse<ITeam[]> = {
            data: teams,
            error: null,
            message: "Teams retrieved successfully"
        };
        res.json(response);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ data: null, error: "Internal server erro" });
    }
};

export const getTeamById = async (req: Request, res: Response): Promise<void> => {
    try {
        const team = await teamService.getTeamById(Number(req.params.id));
        res.json({ data: team, error: null });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ data: null, error: "Internal server error" });
    }
};

export const deleteTeam = async (
    req: Request,
    res: Response,
    ): Promise<void> => {
    try {
        const deletedTeam = await teamService.deleteTeam(Number(req.params.id));
        res.json({ data: deletedTeam, error: null });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ data: null, error: "Internal server error" });
    }
};
