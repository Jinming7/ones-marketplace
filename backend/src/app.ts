import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import apiRouter from "./routes/index.js";
import { mockAuth } from "./middlewares/auth.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(mockAuth);

app.get("/health", (_req, res) => {
  res.status(StatusCodes.OK).json({ ok: true });
});

app.use("/api", apiRouter);

app.use((error: Error & { status?: number }, _req: Request, res: Response, _next: NextFunction) => {
  const status = error.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(status).json({
    message: error.message || "Internal server error"
  });
});
