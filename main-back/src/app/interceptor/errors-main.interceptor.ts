import { Injectable, NestInterceptor, ExecutionContext, CallHandler, ConflictException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ErrorsMainInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        return next.handle().pipe(
            catchError(error => {
                console.log('ERROR ----------------------------->');
                console.log(error);
                console.log('ERROR -----------------------------<');

                if (error instanceof PrismaClientKnownRequestError) {
                    return throwError(
                        () =>
                            new ConflictException({
                                errorCode: error.code,
                                message: error.message,
                                localizationKey: `PRISMA_${error.code}`,
                                details: getPrismaErrorMessage(error.code, error.meta as never),
                            })
                    );
                }
                return throwError(() => new Error(error));
            })
        );
    }
}

export const PrismaErrorMessages: Record<string, (meta: Record<string, string>) => string> = {
    P1000: meta =>
        `Authentication failed against database server at [ ${meta.modelName} ], the provided database credentials for [ ${meta.target} ] are not valid.`,
    P1001: () => `Can't reach database server.`,
    P1002: () => `Database server timed out.`,
    P1003: meta =>
        `Database does not exist at ${
            meta.database_file_path || meta.database_name + '.' + meta.database_schema_name || meta.database_name
        }.`,
    P1008: meta => `Operations timed out after ${meta.time}.`,
    P1009: meta => `Database ${meta.database_name} already exists.`,
    P1010: meta => `User ${meta.database_user} was denied access.`,
    P1011: meta => `Error opening a TLS connection: ${meta.message}.`,
    P1012: meta => `${meta.full_error}`,
    P1013: meta => `The provided database string is invalid: ${meta.details}.`,
    P1014: meta => `The underlying ${meta.kind} for model ${meta.model} does not exist.`,
    P1015: meta =>
        `Schema uses unsupported features for the database version ${meta.database_version}. Errors: ${meta.errors}.`,
    P1016: meta => `Incorrect number of parameters for raw query. Expected: ${meta.expected}, actual: ${meta.actual}.`,
    P1017: () => `Server has closed the connection.`,

    P2000: meta => `Value too long for column ${meta.target}.`,
    P2001: meta => `Record does not exist in ${meta.model_name}.${meta.argument_name} = ${meta.argument_value}.`,
    P2002: meta => `Unique constraint failed on [ ${meta.modelName} -> ${meta.target} ].  TEST[${JSON.stringify(meta)}`, // checked
    P2003: meta => `Foreign key constraint failed. [ TABLE: ${meta.modelName} , FIELD: ${meta.field_name} ]`,
    P2004: meta => `Constraint failed on the database: ${meta.database_error}.`,
    P2005: meta => `Invalid value ${meta.field_value} for field ${meta.field_name}.`,

    // ... więcej błędów ...
    P4000: meta => `Introspection operation failed: ${meta.introspection_error}.`,
    P4001: () => `The introspected database was empty.`,
    P4002: meta => `Inconsistent schema in the introspected database: ${meta.explanation}.`,

    // ... Prisma Accelerate errors ...
    P6000: () => `Generic server error.`,
    P6001: () => `Invalid data source URL.`,
    P6002: () => `Unauthorized API key in the connection string.`,
    P6003: () => `Plan limit reached.`,
    P6004: () => `Query timeout exceeded.`,
    P6005: () => `Invalid parameters supplied.`,
    P6006: () => `Version not supported by Prisma Accelerate.`,
    P6008: () => `Engine failed to start.`,
    P6009: () => `Response size limit exceeded.`,
    // ... więcej błędów Prisma Accelerate ...
};

export function getPrismaErrorMessage(errorCode: string, meta: Record<string, string>) {
    const errorMessageGenerator = PrismaErrorMessages[errorCode];
    return errorMessageGenerator ? errorMessageGenerator(meta) : `Unknown error with code ${errorCode}`;
}
