import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OfferService } from '../offer.service';
import { OfferType } from '../entities/offer.type';
import { UpdateOfferInput } from '../dto/update-offer.input';
import { CreateOfferInput } from '../dto/create-offer.input';
import { QueryOptionsInput } from '../../../core/graphql/pagination-sort.input';

@Resolver(() => OfferType)
export class OfferResolver {
    constructor(private readonly offerService: OfferService) {}

    // @Query(() => [OfferType], { name: 'getAllOffers' })
    // async getAllOffers(): Promise<OfferTable[]> {
    //     return this.offerService.getAllOffers();
    // }

    @Query(() => [OfferType])
    async getAllOffers(@Args('options', { type: () => QueryOptionsInput, nullable: true }) options: QueryOptionsInput) {
        return this.offerService.getAllOffersExtend(options);
    }

    @Query(() => OfferType, { name: 'getOfferById', nullable: true })
    async getOfferById(@Args('id') id: string): Promise<OfferType | null> {
        return this.offerService.getOfferById(id);
    }

    @Mutation(() => OfferType)
    async createOffer(@Args('createOfferInput') createOfferInput: CreateOfferInput): Promise<OfferType> {
        return this.offerService.createOffer(createOfferInput);
    }

    @Mutation(() => OfferType)
    async updateOffer(
        @Args('id') id: string,
        @Args('updateOfferInput') updateOfferInput: UpdateOfferInput
    ): Promise<OfferType> {
        return this.offerService.updateOffer(id, updateOfferInput);
    }

    @Mutation(() => OfferType)
    async deleteOffer(@Args('id') id: string): Promise<OfferType> {
        return this.offerService.deleteOffer(id);
    }
}
