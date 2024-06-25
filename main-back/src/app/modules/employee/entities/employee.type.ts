import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CompanyType } from '../../company/entities/company.type';

@ObjectType() // Dekorator GraphQL
export class EmployeeType {
    @Field(() => ID) // Dekorator GraphQL
    id: string;

    @Field({ nullable: true })
    imageUrl?: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    email: string;

    @Field()
    position: string;

    @Field()
    isActive: boolean;

    @Field({ nullable: true })
    phoneNumber?: string;

    @Field(() => CompanyType, { nullable: true })
    company?: CompanyType;
}
