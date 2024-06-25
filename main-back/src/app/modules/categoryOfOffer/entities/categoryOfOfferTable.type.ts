import { Field, ObjectType, ID } from '@nestjs/graphql';
import { OfferType } from '../../offer/entities/offer.type';

@ObjectType()
export class CategoryOfOfferTableType {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field({ nullable: true })
    imageUrl?: string;

    @Field(() => [OfferType], { nullable: true })
    offers?: OfferType[];
}
