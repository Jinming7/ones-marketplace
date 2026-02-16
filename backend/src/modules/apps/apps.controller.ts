import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { appsService } from "./apps.service.js";

export class AppsController {
  async searchApps(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await appsService.searchApps(req.query);
      const hal = appsService.toHalSearchResponse("/api/apps/search", result);
      res.status(StatusCodes.OK).json(hal);
    } catch (error) {
      next(error);
    }
  }

  async getAppByKey(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const appKey = String(req.params.appKey ?? "");
      const app = await appsService.getAppByKey(appKey);

      res.status(StatusCodes.OK).json({
        _links: {
          self: { href: `/api/apps/${appKey}` }
        },
        ...app
      });
    } catch (error) {
      next(error);
    }
  }
}

export const appsController = new AppsController();
