import { Module } from '@nestjs/common';
import { OfferForCompanyService } from './offerForCompany.service';
import { OfferForCompanyResolver } from './resolvers/offerForCompany.resolver';
import { PrismaService } from '../../prisma.service';

@Module({
    providers: [OfferForCompanyService, OfferForCompanyResolver, PrismaService],
})
export class OfferForCompanyModule {}
