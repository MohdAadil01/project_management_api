import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";

export const healthCheck = asyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    const healthInfo = {
      status: "OK",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };

    return ApiResponse.send(res, 200, healthInfo, "API is healthy and runnig.");
  }
);
