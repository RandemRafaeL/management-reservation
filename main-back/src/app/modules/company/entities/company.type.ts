import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserType } from '../../user/entities/user.type';

@ObjectType()
export class CompanyType {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    address: string;

    @Field()
    email: string;

    @Field({ nullable: true })
    phoneNumber?: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    imageId?: string;

    @Field({ nullable: true })
    imageUrl?: string;

    @Field(() => UserType, { nullable: true })
    user?: UserType;

    // @Field(() => [EmployeeType])
    // employees?: EmployeeType[];
}
