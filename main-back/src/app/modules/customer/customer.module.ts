import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerResolver } from './resolvers/customer.resolver';
import { PrismaService } from '../../prisma.service';

@Module({
    providers: [CustomerService, CustomerResolver, PrismaService],
})
export class CustomerModule {}
