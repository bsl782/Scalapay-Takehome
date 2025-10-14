import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  type HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import type { Request, Response } from "express";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const responseBody = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: this.getErrorMessage(status, exception),
    };

    response.status(status).json(responseBody);
  }

  private getErrorMessage(status: number, exception: HttpException): string {
    const exceptionResponse = exception.getResponse();

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      return "Something went wrong. Please try again later.";
    }

    if (typeof exceptionResponse === "string") {
      return exceptionResponse;
    }

    const exceptionResponseObj = exceptionResponse as { message?: string };
    return exceptionResponseObj.message || exception.message;
  }
}
