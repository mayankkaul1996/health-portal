import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import ResponseConstants from 'src/constants/response.contants';
import { ILogger, Logger } from '../logging/logger';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger: ILogger = Logger.getLogger();
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        let jsonResponse = exception.getResponse();
        if (!jsonResponse.valueOf().hasOwnProperty('code')) {
            jsonResponse = ResponseConstants.Common[status];
            if (jsonResponse === undefined || jsonResponse === null) {
                this.logger.error(`Could not find common response constant for status ${status}. Defaulting to 500.`);
                jsonResponse = ResponseConstants.Common[500];
            }
        }

        response
            .status(status)
            .json(jsonResponse);
    }
}