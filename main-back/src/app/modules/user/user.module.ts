import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './resolvers/user.resolver';
import { PrismaService } from '../../prisma.service';

@Module({
    imports: [],
    exports: [UserService],
    providers: [UserService, UserResolver, PrismaService],
    controllers: [],
})
export class UsersModule {}
