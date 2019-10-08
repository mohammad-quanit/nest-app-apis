import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  Logger,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // Gettting all http errors
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const errResponse = {
      code: status,
      timestamp: new Date().toLocaleTimeString(),
      path: request.url,
      method: request.method,
      message: (status !== HttpStatus.INTERNAL_SERVER_ERROR) ? (exception.message.error || exception.message || null) : 'Internal Server Error!',
    };

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      console.error(exception);
    }

    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errResponse),
      'ExceptionFilter',
    );

    response.status(status).json(errResponse);
  }
}
