import { Pipe, PipeTransform } from '@angular/core';
import { UserRoleEnum } from '../../../graphql/_generated/types';

@Pipe({
    name: 'roleText',
    standalone: true,
})
export class RoleTextPipe implements PipeTransform {
    transform(value: UserRoleEnum | null): string {
        return roleList.find(role => role.id === (value as UserRoleEnum))?.name || '';
    }
}

export const roleList: { id: UserRoleEnum; name: string }[] = [
    { id: UserRoleEnum.Admin, name: 'Administrator' },
    { id: UserRoleEnum.Owner, name: 'Właściciel' },
    { id: UserRoleEnum.Employee, name: 'Pracownik' },
    { id: UserRoleEnum.User, name: 'Użytkownik' },
];
