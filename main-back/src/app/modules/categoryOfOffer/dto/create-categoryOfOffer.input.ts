import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCategoryOfOfferInput {
    @Field()
    name: string;

    @Field({ nullable: true })
    imageUrl?: string;
}
