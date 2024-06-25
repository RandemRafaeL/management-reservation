import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateResolver } from './state.resolver';
import { PrismaService } from '../../prisma.service';

@Module({
    providers: [StateService, StateResolver, PrismaService],
})
export class StateModule {}
