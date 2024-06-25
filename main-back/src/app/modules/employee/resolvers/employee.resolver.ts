import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EmployeeService } from '../employee.service';
import { EmployeeType } from '../entities/employee.type';
import { CreateEmployeeInput } from '../dto/create-employee.input';
import { UpdateEmployeeInput } from '../dto/update-employee.input';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { UserType } from '../../user/entities/user.type';
import { QueryOptionsInput } from '../../../core/graphql/pagination-sort.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../../guards/gql-auth.guards';

@Resolver(() => EmployeeType)
export class EmployeeResolver {
    constructor(private readonly employeeService: EmployeeService) {}

    @Mutation(() => EmployeeType)
    async createEmployee(@Args('createEmployeeInput') createEmployeeInput: CreateEmployeeInput): Promise<EmployeeType> {
        return this.employeeService.create(createEmployeeInput);
    }

    @Query(() => [EmployeeType])
    async listEmployee(): Promise<EmployeeType[]> {
        return this.employeeService.listEmployee();
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [EmployeeType])
    async listEmployee_User(
        @CurrentUser() user: UserType,
        @Args('options', { type: () => QueryOptionsInput, nullable: true }) options: QueryOptionsInput
    ): Promise<EmployeeType[]> {
        if (user.role === 'ADMIN') {
            return this.employeeService.listEmployee();
        }
        return this.employeeService.listEmployee_User(user.id, options);
    }

    @Query(() => EmployeeType, { nullable: true })
    async getEmployee(@Args('id') id: string): Promise<EmployeeType> {
        return this.employeeService.findOne(id);
    }

    @Mutation(() => EmployeeType)
    async updateEmployee(
        @Args('id') id: string,
        @Args('updateEmployeeInput') updateEmployeeDto: UpdateEmployeeInput
    ): Promise<EmployeeType> {
        return this.employeeService.update(id, updateEmployeeDto);
    }

    @Mutation(() => Boolean)
    async deleteEmployee(@Args('id') id: string): Promise<boolean> {
        await this.employeeService.remove(id);
        return true;
    }
}
