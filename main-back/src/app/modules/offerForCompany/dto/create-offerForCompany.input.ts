import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateOfferForCompanyInput {
    @Field(() => String)
    offerId: string;

    @Field(() => String)
    companyId: string;

    @Field(() => Float)
    price: number; // Cena usługi

    @Field(() => String)
    duration: string; // Czas trwania w minutach, format HH:mm

    @Field(() => Boolean)
    availability: boolean; // Dostępność oferty

    @Field(() => String, { nullable: true })
    customName?: string;

    @Field(() => String, { nullable: true })
    customImageUrl?: string;

    @Field(() => String, { nullable: true })
    customDescription?: string;
}
