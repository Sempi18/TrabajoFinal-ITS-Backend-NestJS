import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // Extraemos la respuesta de la excepción
    const exceptionResponse = exception.getResponse();
    const message = Array.isArray(exceptionResponse['message']) 
      ? exceptionResponse['message'] 
      : [exceptionResponse['message']];

    // Construimos la respuesta de error personalizada
    response.status(status).json({
      statusCode: status,
      message: message.length > 0 ? message : exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
