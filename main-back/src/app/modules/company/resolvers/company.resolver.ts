import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CompanyService } from '../company.service';
import { CompanyType } from '../entities/company.type';
import { CreateCompanyInput } from '../dto/create-company.input';
import { UpdateCompanyInput } from '../dto/update-company.input';
import { Roles } from '../../../decorators/role.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../../guards/gql-auth.guards';
import { RolesGuard } from '../../../guards/role.guard';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { UserType } from '../../user/entities/user.type';
import { Permission, RegisterPermissions } from '../../core/permissions/permission.service';
import { QueryOptionsInput } from '../../../core/graphql/pagination-sort.input';

export const permissions_Company: Permission<CompanyResolver> = {
    listCompany: ['ADMIN'],
    getCompany: ['ADMIN'],
    createCompany: ['ADMIN'],
    updateCompany: ['ADMIN'],
    listCompanyForUser: ['OWNER', 'ADMIN'],
    createCompanyForUser: ['OWNER', 'ADMIN'],
    updateCompanyForUser: ['OWNER', 'ADMIN'],
    deleteCompany: ['OWNER', 'ADMIN'],
};
console.log('Company', RegisterPermissions);

@RegisterPermissions(permissions_Company)
@Resolver(() => CompanyType)
export class CompanyResolver {
    constructor(private readonly companyService: CompanyService) {}

    // ADMIN
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles(...permissions_Company.listCompany)
    @Query(() => [CompanyType])
    async listCompany(): Promise<CompanyType[]> {
        return this.companyService.findAll();
    }

    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles(...permissions_Company.getCompany)
    @Query(() => CompanyType)
    async getCompany(@Args('id', { type: () => String }) id: string): Promise<CompanyType> {
        return this.companyService.findOne(id);
    }

    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles(...permissions_Company.createCompany)
    @Mutation(() => CompanyType)
    async createCompany(@Args('createCompanyInput') createCompanyInput: CreateCompanyInput): Promise<CompanyType> {
        return this.companyService.create(createCompanyInput);
    }

    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles(...permissions_Company.updateCompany)
    @Mutation(() => CompanyType)
    async updateCompany(
        @Args('id', { type: () => String }) id: string,
        @Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput
    ): Promise<CompanyType> {
        return this.companyService.update(id, updateCompanyInput);
    }

    //  OWNER
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles(...permissions_Company.listCompanyForUser)
    @Query(() => [CompanyType])
    async listCompanyForUser(
        @CurrentUser() user: UserType,
        @Args('options', { type: () => QueryOptionsInput, nullable: true }) options: QueryOptionsInput
    ): Promise<CompanyType[]> {
        if (user.role === 'ADMIN') {
            return this.companyService.findAll(options);
        }
        return this.companyService.findCompaniesByUser(user.username, options);
    }

    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles(...permissions_Company.createCompanyForUser)
    @Mutation(() => CompanyType)
    async createCompanyForUser(
        @Args('createCompanyInput') createCompanyInput: CreateCompanyInput,
        @CurrentUser() user: UserType
    ): Promise<CompanyType> {
        if (user.role === 'ADMIN') {
            return this.companyService.create(createCompanyInput);
        }
        return this.companyService.createForUser(createCompanyInput, user.username);
    }

    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles(...permissions_Company.updateCompanyForUser)
    @Mutation(() => CompanyType)
    async updateCompanyForUser(
        @Args('id', { type: () => String }) id: string,
        @Args('updateCompanyForUserInput') updateCompanyForUserInput: UpdateCompanyInput,
        @CurrentUser() user: UserType
    ): Promise<CompanyType> {
        if (user.role === 'ADMIN') {
            return this.companyService.update(id, updateCompanyForUserInput);
        }
        return this.companyService.update(id, { ...updateCompanyForUserInput, userId: user.id });
    }

    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles(...permissions_Company.deleteCompany)
    @Mutation(() => CompanyType)
    async deleteCompany(@Args('id', { type: () => String }) id: string): Promise<CompanyType> {
        return this.companyService.delete(id);
    }
}
