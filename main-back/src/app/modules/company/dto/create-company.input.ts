import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCompanyInput {
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

    // Dodatkowe pola z encji Company
    @Field({ nullable: true })
    imageId?: string;

    @Field({ nullable: true })
    imageUrl?: string;

    @Field(() => String)
    userId: string;
}
