import { Response } from "express";

export class ApiResponse<T> {
  public statusCode: number;
  public data: T;
  public message: string;
  public success: boolean;

  constructor(statusCode: number, data: T, message: string = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }

  public static send<T>(
    res: Response,
    statusCode: number,
    data: T,
    message: string = "Success"
  ): Response {
    const apiResponse = new ApiResponse(statusCode, data, message);
    return res.status(apiResponse.statusCode).json(apiResponse);
  }
}
