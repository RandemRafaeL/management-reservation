import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookingService } from '../booking.service';
import { BookingType } from '../entities/booking.type';
import { CreateBookingInput } from '../dto/create-booking.input';
import { UpdateBookingInput } from '../dto/update-booking.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../../guards/gql-auth.guards';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { UserType } from '../../user/entities/user.type';
import { QueryOptionsInput } from '../../../core/graphql/pagination-sort.input';

@Resolver(() => BookingType)
export class BookingResolver {
    constructor(private readonly bookingService: BookingService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => [BookingType])
    async listBooking_User(
        @CurrentUser() user: UserType,
        @Args('options', { type: () => QueryOptionsInput, nullable: true }) options: QueryOptionsInput
    ) {
        if (user.role === 'ADMIN') {
            return this.bookingService.findAll();
        }
        return this.bookingService.listBooking_User(user.id, options);
    }

    @Query(() => BookingType)
    async getBooking(@Args('id') id: string) {
        return this.bookingService.findOne(id);
    }

    @Query(() => [BookingType])
    async listBookings() {
        return this.bookingService.findAll();
    }

    @Mutation(() => BookingType)
    async createBooking(@Args('createBookingInput') createBookingInput: CreateBookingInput) {
        return this.bookingService.create(createBookingInput);
    }

    @Mutation(() => BookingType)
    async updateBooking(@Args('id') id: string, @Args('updateBookingInput') updateBookingInput: UpdateBookingInput) {
        return this.bookingService.update(id, updateBookingInput);
    }

    @Mutation(() => BookingType)
    async deleteBooking(@Args('id') id: string) {
        return this.bookingService.remove(id);
    }
}
