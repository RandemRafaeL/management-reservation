import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateOfferInput } from './dto/create-offer.input';
import { UpdateOfferInput } from './dto/update-offer.input';
import { QueryOptionsInput } from '../../core/graphql/pagination-sort.input';
import { OfferType } from './entities/offer.type';
import { queryOptions } from '../../core/graphql/pagination-sort.decorator';

@Injectable()
export class OfferService {
    constructor(private prisma: PrismaService) {}

    async createOffer(data: CreateOfferInput): Promise<OfferType> {
        return this.prisma.offerTable.create({
            data,
        });
    }

    async getAllOffers(): Promise<OfferType[]> {
        return this.prisma.offerTable.findMany();
    }

    async getAllOffersExtend(options?: QueryOptionsInput): Promise<OfferType[]> {
        const findManyArgs = queryOptions(options);
        return this.prisma.offerTable.findMany({
            ...findManyArgs,
            include: {
                category: true,
            },
        });
    }

    async getOfferById(id: string): Promise<OfferType | null> {
        return this.prisma.offerTable.findUnique({
            where: { id },
        });
    }

    async updateOffer(id: string, data: UpdateOfferInput): Promise<OfferType> {
        return this.prisma.offerTable.update({
            where: { id },
            data,
        });
    }

    async deleteOffer(id: string): Promise<OfferType> {
        return this.prisma.offerTable.delete({
            where: { id },
        });
    }
}
