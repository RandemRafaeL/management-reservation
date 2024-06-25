import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OfferForEmployeeType } from '../entities/offerForEmployee.type';
import { OfferForEmployeeService } from '../offerForEmployee.service';
import { CreateOfferForEmployeeInput } from '../dto/create-offerForEmployee.input';
import { UpdateOfferForEmployeeInput } from '../dto/update-offerForEmployee.input';

@Resolver(() => OfferForEmployeeType)
export class OfferForEmployeeResolver {
    constructor(private readonly offerForEmployeeService: OfferForEmployeeService) {}

    @Query(() => [OfferForEmployeeType])
    async listOfferForEmployees() {
        return this.offerForEmployeeService.findAll();
    }

    @Query(() => OfferForEmployeeType)
    async getOfferForEmployee(@Args('id') id: string) {
        return this.offerForEmployeeService.findOne(id);
    }

    @Mutation(() => OfferForEmployeeType)
    async createOfferForEmployee(
        @Args('createOfferForEmployeeInput') createOfferForEmployeeInput: CreateOfferForEmployeeInput
    ) {
        return this.offerForEmployeeService.create(createOfferForEmployeeInput);
    }

    @Mutation(() => OfferForEmployeeType)
    async updateOfferForEmployee(
        @Args('id') id: string,
        @Args('updateOfferForEmployeeInput') updateOfferForEmployeeInput: UpdateOfferForEmployeeInput
    ) {
        return this.offerForEmployeeService.update(id, updateOfferForEmployeeInput);
    }

    @Mutation(() => OfferForEmployeeType)
    async deleteOfferForEmployee(@Args('id') id: string) {
        return this.offerForEmployeeService.delete(id);
    }
}
