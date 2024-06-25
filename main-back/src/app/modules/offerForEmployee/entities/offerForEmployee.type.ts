import { ObjectType, Field, ID } from '@nestjs/graphql';
import { EmployeeType } from '../../employee/entities/employee.type';
import { OfferForCompanyType } from '../../offerForCompany/entities/offerForCompany.type';
import { BookingType } from '../../booking/entities/booking.type';

@ObjectType()
export class OfferForEmployeeType {
    @Field(() => ID)
    id: string;

    @Field(() => OfferForCompanyType, { nullable: true })
    offerForCompany?: OfferForCompanyType;

    @Field(() => EmployeeType, { nullable: true })
    employee?: EmployeeType;

    @Field(() => BookingType, { nullable: true })
    booking?: BookingType;
}
