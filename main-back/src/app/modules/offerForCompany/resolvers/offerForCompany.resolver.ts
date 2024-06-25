import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OfferForCompanyService } from '../offerForCompany.service';
import { OfferForCompanyType } from '../entities/offerForCompany.type';
import { CreateOfferForCompanyInput } from '../dto/create-offerForCompany.input';
import { UpdateOfferForCompanyInput } from '../dto/update-offerForCompany.input';
import { QueryOptionsInput } from '../../../core/graphql/pagination-sort.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../../guards/gql-auth.guards';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { UserType } from '../../user/entities/user.type';

@Resolver(() => OfferForCompanyType)
export class OfferForCompanyResolver {
    constructor(private readonly offerForCompanyService: OfferForCompanyService) {}

    @Mutation(() => OfferForCompanyType)
    async createOfferForCompany(
        @Args('createOfferForCompanyInput') createOfferForCompanyInput: CreateOfferForCompanyInput
    ): Promise<OfferForCompanyType> {
        return this.offerForCompanyService.create(createOfferForCompanyInput);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [OfferForCompanyType])
    async listOffersForCompany(
        @CurrentUser() user: UserType,
        @Args('options', { type: () => QueryOptionsInput, nullable: true }) options: QueryOptionsInput
    ): Promise<OfferForCompanyType[]> {
        if (user.role === 'ADMIN') {
            return this.offerForCompanyService.findAllExtend(options);
        }
        return this.offerForCompanyService.findAllExtend_User(user.id, options);
    }

    @Query(() => OfferForCompanyType, { nullable: true })
    async getOfferForCompany(@Args('id') id: string): Promise<OfferForCompanyType> {
        return this.offerForCompanyService.findOne(id);
    }

    @Mutation(() => OfferForCompanyType)
    async updateOfferForCompany(
        @Args('id') id: string,
        @Args('updateOfferForCompanyInput') updateOfferForCompanyInput: UpdateOfferForCompanyInput
    ): Promise<OfferForCompanyType> {
        return this.offerForCompanyService.update(id, updateOfferForCompanyInput);
    }

    @Mutation(() => Boolean)
    async deleteOfferForCompany(@Args('id') id: string): Promise<boolean> {
        await this.offerForCompanyService.remove(id);
        return true;
    }
}
