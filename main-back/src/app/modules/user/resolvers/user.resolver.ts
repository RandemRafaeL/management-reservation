import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../user.service';
import { Roles } from '../../../decorators/role.decorator';
import { RolesGuard } from '../../../guards/role.guard';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../../guards/gql-auth.guards';
import { UserRoleEnum } from '@prisma/client';
import { UserType } from '../entities/user.type';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { schema_UserBaseDto } from '../dto/create-user.input';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';

@Resolver(() => UserType)
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query(() => Boolean)
    async uniqueUsername(
        @Args('username') username: string,
        @Args('userId', { nullable: true }) userId?: string | null
    ) {
        return this.userService.isUniqueUsername(username, userId);
    }

    @Query(() => GraphQLJSONObject)
    async schemaUser() {
        return schema_UserBaseDto;
    }

    // @UseGuards(GqlAuthGuard, RolesGuard)
    // @Roles(UserRole.ADMIN)
    @Query(() => [UserType])
    async listUsers(): Promise<UserType[]> {
        return this.userService.findAll();
    }

    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles(UserRoleEnum.ADMIN)
    @Query(() => UserType, { nullable: true })
    async getUserByName(@Args('username') username: string): Promise<UserType | undefined> {
        return this.userService.findOneFullUser(username);
    }

    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles(UserRoleEnum.ADMIN)
    @Query(() => UserType, { nullable: true })
    async getUser(@Args('id') id: string) {
        return this.userService.findOneById(id);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => UserType, { nullable: true })
    async getCurrentUser(@CurrentUser() user: UserType): Promise<UserType | undefined> {
        console.log(user);
        if (!user) return undefined;
        return await this.userService.findByUsername(user.username).then(res => {
            console.log(res);
            return res;
        });
    }

    @Mutation(() => UserType)
    async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<UserType> {
        return this.userService.create(createUserInput);
    }

    @Mutation(() => UserType)
    async updateUser(@Args('id') id: string, @Args('updateUserInput') updateUserInput: UpdateUserInput) {
        return this.userService.update(id, updateUserInput);
    }

    @Mutation(() => UserType)
    async deleteUser(@Args('id') id: string) {
        return this.userService.delete(id);
    }
}
