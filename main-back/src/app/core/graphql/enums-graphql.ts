import { registerEnumType } from '@nestjs/graphql';
import { BookingStatus, UserRoleEnum } from '@prisma/client';

registerEnumType(UserRoleEnum, {
    name: 'UserRoleEnum',
});

registerEnumType(BookingStatus, {
    name: 'BookingStatus',
});

export enum SortOrderEnum {
    ASC = 'asc',
    DESC = 'desc',
}

registerEnumType(SortOrderEnum, {
    name: 'SortOrder',
});
