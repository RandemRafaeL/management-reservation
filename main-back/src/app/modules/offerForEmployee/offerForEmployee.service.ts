import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateOfferForEmployeeInput } from './dto/create-offerForEmployee.input';
import { UpdateOfferForEmployeeInput } from './dto/update-offerForEmployee.input';
import { Prisma } from '@prisma/client';

const includeFragment: Prisma.OfferForEmployeeTableInclude = {
    employee: {
        include: {
            company: true,
        },
    },
    offerForCompany: {
        include: {
            offer: true,
            company: true,
        },
    },
    booking: {
        include: {
            customer: true,
            offerForEmployee: true,
            offerForCompany: true,
        },
    },
};

@Injectable()
export class OfferForEmployeeService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createOfferForEmployeeInput: CreateOfferForEmployeeInput) {
        return this.prisma.offerForEmployeeTable.create({
            data: createOfferForEmployeeInput,
            include: includeFragment,
        });
    }

    async findAll() {
        return this.prisma.offerForEmployeeTable.findMany({
            include: includeFragment,
        });
    }

    async findOne(id: string) {
        const offer = await this.prisma.offerForEmployeeTable.findUnique({
            where: { id },
            include: includeFragment,
        });

        if (!offer) {
            throw new NotFoundException(`OfferForEmployee with ID "${id}" not found`);
        }

        return offer;
    }

    async update(id: string, updateOfferForEmployeeInput: UpdateOfferForEmployeeInput) {
        return this.prisma.offerForEmployeeTable.update({
            where: { id },
            data: updateOfferForEmployeeInput,
            include: includeFragment,
        });
    }

    async delete(id: string) {
        return this.prisma.offerForEmployeeTable.delete({
            where: { id },
            include: includeFragment,
        });
    }
}
