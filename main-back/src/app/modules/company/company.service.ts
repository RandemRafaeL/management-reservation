import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { UserService } from '../user/user.service';
import { CompanyTable } from '@prisma/client';
import { CompanyType } from './entities/company.type';
import { QueryOptionsInput } from '../../core/graphql/pagination-sort.input';
import { queryOptions } from '../../core/graphql/pagination-sort.decorator';

@Injectable()
export class CompanyService {
    constructor(
        private prismaService: PrismaService,
        private userService: UserService
    ) {}

    async create(createCompanyInput: CreateCompanyInput): Promise<CompanyTable> {
        const { userId, ...companyData } = createCompanyInput;
        return this.prismaService.companyTable.create({
            data: {
                ...companyData,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
            include: { user: true },
        });
    }

    async createForUser(createCompanyInput: CreateCompanyInput, username: string): Promise<CompanyType> {
        const user = await this.userService.findByUsername(username);
        if (!user) {
            throw new NotFoundException(`User with name ${username} not found.`);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { userId, ...companyData } = createCompanyInput;
        return this.prismaService.companyTable.create({
            data: {
                ...companyData,
                user: {
                    connect: {
                        id: user.id,
                    },
                },
            },
            include: { user: true },
        });
    }

    async findCompaniesByUser(username: string, options?: QueryOptionsInput): Promise<CompanyTable[]> {
        return this.prismaService.companyTable.findMany({
            ...queryOptions(options),
            where: {
                user: {
                    username,
                },
            },
            include: {
                user: true,
            },
        });
    }

    async findAll(options?: QueryOptionsInput): Promise<CompanyTable[]> {
        return this.prismaService.companyTable.findMany({
            ...queryOptions(options),
            include: {
                user: true,
            },
        });
    }

    async findOne(id: string): Promise<CompanyTable> {
        const company = await this.prismaService.companyTable.findUnique({
            where: { id },
        });
        if (!company) {
            throw new NotFoundException(`Company with ID ${id} not found.`);
        }
        return company;
    }

    async update(id: string, updateCompanyInput: UpdateCompanyInput): Promise<CompanyTable> {
        await this.findOne(id); // Upewniam się, że firma istnieje
        return this.prismaService.companyTable.update({
            where: { id },
            data: updateCompanyInput,
            include: { user: true },
        });
    }

    async delete(id: string): Promise<CompanyTable> {
        return this.prismaService.companyTable.delete({
            where: { id },
        });
    }
}
