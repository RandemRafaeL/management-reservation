import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateOfferInput {
    @Field()
    name: string;

    @Field()
    imageUrl: string;

    @Field({ nullable: true })
    description?: string;

    @Field()
    categoryId: string;
}
