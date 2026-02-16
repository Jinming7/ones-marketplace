import { Router } from "express";
import { appsController } from "../modules/apps/apps.controller.js";

const router = Router();

router.get("/search", (req, res, next) => appsController.searchApps(req, res, next));
router.get("/:appKey", (req, res, next) => appsController.getAppByKey(req, res, next));

export default router;
