import { Field, ObjectType, ID } from '@nestjs/graphql';
import { CategoryOfOfferTableType } from '../../categoryOfOffer/entities/categoryOfOfferTable.type';

@ObjectType()
export class OfferType {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    imageUrl: string;

    @Field({ nullable: true })
    description?: string;

    @Field(() => CategoryOfOfferTableType, { nullable: true })
    category?: CategoryOfOfferTableType;
}
