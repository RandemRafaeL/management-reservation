import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateOfferForCompanyInput } from './dto/create-offerForCompany.input';
import { UpdateOfferForCompanyInput } from './dto/update-offerForCompany.input';
import { queryOptions } from '../../core/graphql/pagination-sort.decorator';
import { QueryOptionsInput } from '../../core/graphql/pagination-sort.input';

@Injectable()
export class OfferForCompanyService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createOfferForCompanyInput: CreateOfferForCompanyInput) {
        const { companyId, offerId, ...createOfferForCompanyInputWithoutRelationsIds } = createOfferForCompanyInput;
        return this.prisma.offerForCompanyTable.create({
            data: {
                ...createOfferForCompanyInputWithoutRelationsIds,
                offer: {
                    connect: { id: offerId },
                },
                company: {
                    connect: { id: companyId },
                },
            },
            include: {
                offer: {
                    include: {
                        category: true,
                    },
                },
                company: true,
            },
        });
    }

    async findAllExtend(options?: QueryOptionsInput) {
        return this.prisma.offerForCompanyTable.findMany({
            ...queryOptions(options),
            include: {
                offer: {
                    include: {
                        category: true,
                    },
                },
                company: true,
            },
        });
    }

    async findAllExtend_User(userId: string, options?: QueryOptionsInput) {
        return this.prisma.offerForCompanyTable.findMany({
            ...queryOptions(options),
            where: {
                company: {
                    userId: userId,
                },
            },
            include: {
                offer: {
                    include: {
                        category: true,
                    },
                },
                company: true,
            },
        });
    }

    async findAll() {
        return this.prisma.offerForCompanyTable.findMany({
            include: {
                offer: {
                    include: {
                        category: true,
                    },
                },
                company: true,
            },
        });
    }

    async findOne(id: string) {
        return this.prisma.offerForCompanyTable.findUnique({
            where: { id },
            include: {
                offer: {
                    include: {
                        category: true,
                    },
                },
                company: true,
            },
        });
    }

    async update(id: string, updateOfferForCompanyInput: UpdateOfferForCompanyInput) {
        return this.prisma.offerForCompanyTable.update({
            where: { id },
            data: updateOfferForCompanyInput,
            include: {
                offer: {
                    include: {
                        category: true,
                    },
                },
                company: true,
            },
        });
    }

    async remove(id: string) {
        return this.prisma.offerForCompanyTable.delete({
            where: { id },
        });
    }
}
