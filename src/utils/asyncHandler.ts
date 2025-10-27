import { NextFunction, Request, Response, RequestHandler } from "express";

// type AsyncFunction = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => Promise<any>;

export const asyncHandler = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
