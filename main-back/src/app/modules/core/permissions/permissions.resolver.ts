// permissions.resolver.ts
import { Args, Query, Resolver } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { permissions_Company } from '../../company/resolvers/company.resolver';
import { permissions_CategoryOfOffer } from '../../categoryOfOffer/resolvers/categoryofOffers.resolver';

@Resolver()
export class PermissionsResolver {
    @Query(() => GraphQLJSON)
    async getCompanyPermissions(@Args('endpointName', { type: () => String, nullable: true }) name?: string) {
        const permissions = permissions_Company;
        return name && permissions[name] ? permissions[name] : permissions;
    }

    @Query(() => GraphQLJSON)
    async getCategoryOfOfferPermissions(@Args('endpointName', { type: () => String, nullable: true }) name?: string) {
        const permissions = permissions_CategoryOfOffer;
        return name && permissions[name] ? permissions[name] : permissions;
    }
}
