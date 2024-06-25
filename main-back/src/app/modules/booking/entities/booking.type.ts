import { ObjectType, Field, ID } from '@nestjs/graphql';
import { OfferForCompanyType } from '../../offerForCompany/entities/offerForCompany.type';
import { OfferForEmployeeType } from '../../offerForEmployee/entities/offerForEmployee.type';
import { BookingStatus } from '@prisma/client';
import { CustomerType } from '../../customer/entities/customer.type';

@ObjectType()
export class BookingType {
    @Field(() => ID, { nullable: true })
    id: string;

    @Field(() => CustomerType, { nullable: true })
    customer: CustomerType;

    @Field(() => OfferForCompanyType, { nullable: true })
    offerForCompany?: OfferForCompanyType;

    @Field(() => OfferForEmployeeType, { nullable: true })
    offerForEmployee?: OfferForEmployeeType;

    @Field({ nullable: true })
    bookingDate: Date;

    @Field(() => BookingStatus, { nullable: true })
    status: BookingStatus;

    // @Field()
    // createdAt: Date;

    // @Field()
    // updatedAt: Date;
}
