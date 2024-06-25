import { HttpStatus } from '@nestjs/common';
import { ErrorCodeEnum } from './errors-code.enum';

export interface ErrorResponse {
    statusCode: HttpStatus;
    errorCode: ErrorCodeEnum;
    message: string;
    details?: string;
    localizationKey?: string; // Klucz lokalizacji do tłumaczenia komunikatu
}
