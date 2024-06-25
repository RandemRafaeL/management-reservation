import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { OfferType } from '../../offer/entities/offer.type';
import { CompanyType } from '../../company/entities/company.type';

@ObjectType()
export class OfferForCompanyType {
    @Field(() => ID)
    id: string;

    @Field(() => Float)
    price: number; // Cena usługi

    @Field(() => String)
    duration: string; // Czas trwania w minutach Format HH:mm

    @Field(() => Boolean)
    availability: boolean; // Dostępność oferty

    @Field(() => String, { nullable: true })
    customName?: string;

    @Field(() => String, { nullable: true })
    customImageUrl?: string;

    @Field(() => String, { nullable: true })
    customDescription?: string;

    @Field(() => OfferType, { nullable: true })
    offer?: OfferType;

    @Field(() => CompanyType, { nullable: true })
    company?: CompanyType;
}
