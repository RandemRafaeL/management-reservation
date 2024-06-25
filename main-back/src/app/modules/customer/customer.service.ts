import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';

@Injectable()
export class CustomerService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createCustomerInput: CreateCustomerInput) {
        return this.prisma.customerTable.create({
            data: createCustomerInput,
        });
    }

    async findAll() {
        return this.prisma.customerTable.findMany({
            include: {
                bookings: {
                    include: {
                        offerForCompany: true,
                        offerForEmployee: true,
                    },
                },
            },
        });
    }

    async findOne(id: string) {
        const customer = await this.prisma.customerTable.findUnique({
            where: { id },
        });
        if (!customer) {
            throw new NotFoundException(`Customer with ID "${id}" not found`);
        }
        return customer;
    }

    async update(id: string, updateCustomerInput: UpdateCustomerInput) {
        return this.prisma.customerTable.update({
            where: { id },
            data: updateCustomerInput,
        });
    }

    async delete(id: string) {
        return this.prisma.customerTable.delete({
            where: { id },
        });
    }
}
