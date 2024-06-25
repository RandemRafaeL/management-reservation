import { InputType, Field, ID } from '@nestjs/graphql';
import { BookingStatus } from '@prisma/client';

@InputType()
export class CreateBookingInput {
    @Field(() => ID)
    customerId: string;

    @Field(() => ID)
    offerForCompanyId: string;

    @Field(() => ID, { nullable: true })
    offerForEmployeeId?: string;

    @Field()
    bookingDate: Date;

    @Field(() => BookingStatus, { nullable: true })
    status?: BookingStatus;
}
