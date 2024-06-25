import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { EmployeeTable } from '@prisma/client';
import { QueryOptionsInput } from '../../core/graphql/pagination-sort.input';
import { queryOptions } from '../../core/graphql/pagination-sort.decorator';

@Injectable()
export class EmployeeService {
    constructor(private prismaService: PrismaService) {}

    async create(createEmployeeInput: CreateEmployeeInput): Promise<EmployeeTable> {
        const companyExists = await this.prismaService.companyTable.findUnique({
            where: { id: createEmployeeInput.companyId },
        });
        if (!companyExists) {
            throw new NotFoundException(`Company with ID ${createEmployeeInput.companyId} not found.`);
        }

        const { companyId, ...inputWithoutCompanyId } = createEmployeeInput; // Wykluczamy 'id' z obiektu

        return this.prismaService.employeeTable.create({
            data: {
                ...inputWithoutCompanyId,
                company: {
                    connect: { id: companyId },
                },
            },
            include: { company: true },
        });
    }

    async listEmployee_User(userId: string, options?: QueryOptionsInput) {
        return this.prismaService.employeeTable.findMany({
            ...queryOptions(options),
            where: {
                company: {
                    userId: userId,
                },
            },
            include: {
                company: true,
            },
        });
    }

    async listEmployee() {
        return this.prismaService.employeeTable.findMany({
            include: { company: true },
        });
    }

    async findOne(id: string) {
        const employee = await this.prismaService.employeeTable.findUnique({
            where: { id },
            include: {
                company: true,
            },
        });
        if (!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found.`);
        }
        return employee;
    }

    async update(id: string, updateEmployeeInput: UpdateEmployeeInput) {
        console.log(updateEmployeeInput);
        const companyExists = await this.prismaService.companyTable.findUnique({
            where: { id: updateEmployeeInput.companyId },
        });
        if (!companyExists) {
            throw new Error(`Company with ID ${updateEmployeeInput.companyId} does not exist.`);
        }
        // const employeeExists = await this.findOne(id); // Sprawdź czy pracownik istnieje
        return this.prismaService.employeeTable.update({
            where: { id },
            data: updateEmployeeInput,
            include: { company: true },
        });
    }

    async remove(id: string) {
        await this.findOne(id); // Sprawdź czy pracownik istnieje
        return this.prismaService.employeeTable.delete({
            where: { id },
        });
    }
}
