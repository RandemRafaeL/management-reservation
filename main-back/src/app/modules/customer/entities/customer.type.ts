import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BookingType } from '../../booking/entities/booking.type';

@ObjectType()
export class CustomerType {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field({ nullable: true }) // Numer telefonu jest opcjonalny
    phone?: string;

    @Field(() => [BookingType], { nullable: 'itemsAndList' }) // Lista rezerwacji może być pusta
    bookings?: BookingType[];

    // @Field()
    // createdAt: Date;
    //
    // @Field()
    // updatedAt: Date;
}
