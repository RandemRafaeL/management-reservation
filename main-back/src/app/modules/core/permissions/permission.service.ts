// permissions.service.ts
import { Injectable } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from '@prisma/client';

@Injectable()
export class PermissionsService {
    //  Maybe in the Future :)
}

export const PERMISSIONS_KEY = 'permissions';

export type Permission<T> = { [ENDPOINT in keyof T]: UserRoleEnum[] };

export function RegisterPermissions<T>(permissions: Permission<T>) {
    return SetMetadata(PERMISSIONS_KEY, permissions);
}
