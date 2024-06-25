import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StateService } from './state.service';
import { StateType } from './state.type';
import { StateInput } from './state.input';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { UserType } from '../user/entities/user.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../guards/gql-auth.guards';

@Resolver()
export class StateResolver {
    constructor(private readonly stateService: StateService) {}

    @UseGuards(GqlAuthGuard)
    @Mutation(() => StateType)
    async setState(
        //
        @CurrentUser() user: UserType,
        @Args('input') input: StateInput
    ) {
        if (user && !input.userId) {
            input.userId = user.id;
        }

        return this.stateService //
            .setState(input.key, input.userId, input.value);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => StateType, { nullable: true })
    async getState(
        @CurrentUser() user: UserType,
        @Args('key') key: string,
        @Args('userId', { nullable: true }) userId: string
    ) {
        if (user && !userId) {
            userId = user.id;
        }

        return this.stateService //
            .getState(key, userId);
    }

    @Query(() => [StateType])
    async listState() {
        return this.stateService.listState();
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => StateType, { nullable: true })
    async deleteState(
        @CurrentUser() user: UserType,
        @Args('key') key: string,
        @Args('userId', { nullable: true }) userId: string
    ) {
        if (user && !userId) {
            userId = user.id;
        }

        return this.stateService //
            .deleteState(key, userId);
    }

    @Mutation(() => StateType, { nullable: true })
    async deleteStateById(@Args('id') id: string) {
        return this.stateService //
            .deleteStateById(id);
    }
}
