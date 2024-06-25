import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CustomerService } from '../customer.service';
import { CustomerType } from '../entities/customer.type';
import { CreateCustomerInput } from '../dto/create-customer.input';
import { UpdateCustomerInput } from '../dto/update-customer.input';

@Resolver(() => CustomerType)
export class CustomerResolver {
    constructor(private readonly customerService: CustomerService) {}

    @Query(() => [CustomerType])
    async listCustomer() {
        return this.customerService.findAll();
    }

    @Query(() => CustomerType)
    async getCustomer(@Args('id') id: string) {
        return this.customerService.findOne(id);
    }

    @Mutation(() => CustomerType)
    async createCustomer(@Args('createCustomerInput') createCustomerInput: CreateCustomerInput) {
        return this.customerService.create(createCustomerInput);
    }

    @Mutation(() => CustomerType)
    async updateCustomer(
        @Args('id') id: string,
        @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput
    ) {
        return this.customerService.update(id, updateCustomerInput);
    }

    @Mutation(() => CustomerType)
    async deleteCustomer(@Args('id') id: string) {
        return this.customerService.delete(id);
    }
}
