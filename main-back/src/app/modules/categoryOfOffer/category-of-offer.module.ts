import { Module } from '@nestjs/common';
import { CategoryOfOfferService } from './categoryOfOffers.service';
import { CategoryOfOfferResolver } from './resolvers/categoryofOffers.resolver';
import { PrismaService } from '../../prisma.service';
import { UsersModule } from '../user/user.module';

@Module({
    imports: [UsersModule],
    providers: [CategoryOfOfferService, CategoryOfOfferResolver, PrismaService],
})
export class CategoryOfOfferModule {}
