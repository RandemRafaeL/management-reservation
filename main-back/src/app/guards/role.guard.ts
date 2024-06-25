import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import { UserRoleEnum } from '@prisma/client';
import { ErrorResponse } from '../core/errors/error-response.interface';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<UserRoleEnum[]>(ROLES_KEY, context.getHandler());
        if (!roles) {
            return true;
        }
        const ctx = GqlExecutionContext.create(context);
        const user = ctx.getContext().req.user;

        if (user && roles.includes(user.role)) {
            return true;
        } else {
            const errorRes: Partial<ErrorResponse> = {
                // errorCode: ErrorCode.ACCESS_FORBIDDEN,
                message: 'Access to this resource is forbidden',
                localizationKey: 'NO_AUTHORIZATION',
                details: 'No authorization, you have no permissions',
            };

            // throw new ForbiddenException(errorRes);
            throw new HttpException(
                {
                    ...errorRes,
                },
                HttpStatus.FORBIDDEN
            );
        }
    }
}
