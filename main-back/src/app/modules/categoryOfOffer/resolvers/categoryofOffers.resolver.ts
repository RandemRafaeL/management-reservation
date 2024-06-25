import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryOfOfferService } from '../categoryOfOffers.service';
import { CategoryOfOfferTableType } from '../entities/categoryOfOfferTable.type';
import { CreateCategoryOfOfferInput } from '../dto/create-categoryOfOffer.input';
import { UpdateCategoryOfOfferInput } from '../dto/update-categoryOfOffer.input';
import { QueryOptionsInput } from '../../../core/graphql/pagination-sort.input';
import { Permission, RegisterPermissions } from '../../core/permissions/permission.service';
import { Roles } from '../../../decorators/role.decorator';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../guards/role.guard';
import { GqlAuthGuard } from '../../../guards/gql-auth.guards';

export const permissions_CategoryOfOffer: Permission<CategoryOfOfferResolver> = {
    listCategoryOfOffer: ['ADMIN', 'OWNER'],
    getCategoryOfOffer: ['ADMIN', 'OWNER'],
    createCategoryOfOffer: ['ADMIN'],
    updateCategoryOfOffer: ['ADMIN'],
    deleteCategoryOfOffer: ['ADMIN'],
};

@RegisterPermissions(permissions_CategoryOfOffer)
@Resolver(() => CategoryOfOfferTableType)
export class CategoryOfOfferResolver {
    constructor(private readonly categoryOfOfferService: CategoryOfOfferService) {}

    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles(...permissions_CategoryOfOffer.listCategoryOfOffer)
    @Query(() => [CategoryOfOfferTableType])
    async listCategoryOfOffer(
        @Args('options', { type: () => QueryOptionsInput, nullable: true }) options: QueryOptionsInput
    ) {
        return this.categoryOfOfferService.getAllCategoriesExtend(options);
    }

    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles(...permissions_CategoryOfOffer.getCategoryOfOffer)
    @Query(() => CategoryOfOfferTableType)
    async getCategoryOfOffer(@Args('id') id: string) {
        return this.categoryOfOfferService.getCategory(id);
    }

    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles(...permissions_CategoryOfOffer.createCategoryOfOffer)
    @Mutation(() => CategoryOfOfferTableType)
    async createCategoryOfOffer(@Args('input') input: CreateCategoryOfOfferInput) {
        return this.categoryOfOfferService.createCategory(input);
    }

    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles(...permissions_CategoryOfOffer.updateCategoryOfOffer)
    @Mutation(() => CategoryOfOfferTableType)
    async updateCategoryOfOffer(@Args('id') id: string, @Args('input') input: UpdateCategoryOfOfferInput) {
        return this.categoryOfOfferService.updateCategory(id, input);
    }

    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles(...permissions_CategoryOfOffer.deleteCategoryOfOffer)
    @Mutation(() => CategoryOfOfferTableType)
    async deleteCategoryOfOffer(@Args('id') id: string) {
        return this.categoryOfOfferService.deleteCategory(id);
    }
}
