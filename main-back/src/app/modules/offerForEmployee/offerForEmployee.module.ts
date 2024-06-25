import { Module } from '@nestjs/common';
import { OfferForEmployeeService } from './offerForEmployee.service';
import { OfferForEmployeeResolver } from './resolvers/offerForEmployeeResolver';
import { PrismaService } from '../../prisma.service';

@Module({
    providers: [OfferForEmployeeService, OfferForEmployeeResolver, PrismaService],
})
export class OfferForEmployeeModule {}
