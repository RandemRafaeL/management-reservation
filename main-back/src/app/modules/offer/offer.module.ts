import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { OfferService } from './offer.service';
import { OfferResolver } from './resolvers/offer.resolver';

@Module({
    imports: [],
    providers: [OfferService, OfferResolver, PrismaService],
})
export class OfferModule {}
