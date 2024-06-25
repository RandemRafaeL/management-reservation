import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './resolvers/employee.resolver';
import { PrismaService } from '../../prisma.service';

@Module({
    imports: [],
    controllers: [],
    providers: [EmployeeService, EmployeeResolver, PrismaService],
})
export class EmployeeModule {}
