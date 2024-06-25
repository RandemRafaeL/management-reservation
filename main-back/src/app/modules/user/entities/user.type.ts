import { CompanyType } from '../../company/entities/company.type';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserRoleEnum } from '@prisma/client';

@ObjectType()
export class UserType {
    @Field(() => ID)
    id: string;

    @Field(() => UserRoleEnum)
    role: UserRoleEnum;

    @Field()
    username: string;

    password: string; // Zwykle nie eksponujemy hasła w GraphQL

    @Field(() => [CompanyType], { nullable: 'itemsAndList' }) // Jeśli relacja może być pusta
    company?: CompanyType[];
}
