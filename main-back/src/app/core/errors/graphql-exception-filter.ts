import { ExceptionFilter, Catch, ArgumentsHost, HttpException, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ErrorCodeEnum } from './errors-code.enum';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = GqlExecutionContext.create(<ExecutionContext>host);
        const response = ctx.getContext().res;
        const status = exception.getStatus();
        const responseContent = exception.getResponse();

        const exceptionResponse = exception.getResponse();
        const errorResponse = {
            errorCode: responseContent['errorCode'] || ErrorCodeEnum.INTERNAL_SERVER_ERROR, // Odczyt kodu błędu
            statusCode: status,
            localizationKey: `errors.${responseContent['errorCode'] || 'default_error'}`,
            details: typeof responseContent === 'string' ? responseContent : responseContent['message'] || '',
            ...(exceptionResponse as object),
        };

        response?.status(status).json(errorResponse);
    }
}
