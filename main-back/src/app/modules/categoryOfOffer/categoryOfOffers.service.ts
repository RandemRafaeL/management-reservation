import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateCategoryOfOfferInput } from './dto/create-categoryOfOffer.input';
import { UpdateCategoryOfOfferInput } from './dto/update-categoryOfOffer.input';
import { QueryOptionsInput } from '../../core/graphql/pagination-sort.input';
import { queryOptions } from '../../core/graphql/pagination-sort.decorator';

@Injectable()
export class CategoryOfOfferService {
    constructor(private prisma: PrismaService) {}

    async createCategory(data: CreateCategoryOfOfferInput) {
        return this.prisma.categoryOfOfferTable.create({
            data,
        });
    }

    async updateCategory(id: string, data: UpdateCategoryOfOfferInput) {
        return this.prisma.categoryOfOfferTable.update({
            where: { id },
            data,
        });
    }

    async deleteCategory(id: string) {
        return this.prisma.categoryOfOfferTable.delete({
            where: { id },
        });
    }

    async getCategory(id: string) {
        return this.prisma.categoryOfOfferTable.findUnique({
            where: { id },
        });
    }

    async getAllCategories() {
        return this.prisma.categoryOfOfferTable.findMany();
    }

    async getAllCategoriesExtend(options?: QueryOptionsInput) {
        return this.prisma.categoryOfOfferTable.findMany({
            ...queryOptions(options),
            include: {
                offers: true,
                _count: {
                    select: {
                        offers: true,
                    },
                },
            },
        });
    }
}
