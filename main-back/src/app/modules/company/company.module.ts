import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { UsersModule } from '../user/user.module';
import { CompanyResolver } from './resolvers/company.resolver';
import { PrismaService } from '../../prisma.service';

@Module({
    imports: [UsersModule],
    controllers: [],
    providers: [CompanyService, CompanyResolver, PrismaService],
})
export class CompanyModule {}
