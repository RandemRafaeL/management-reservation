import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class StateService {
    constructor(private prisma: PrismaService) {}

    async setState(key: string, userId: string, value: any) {
        if (value === null) {
            return this.deleteState(key, userId);
        }

        return this.prisma.stateTable.upsert({
            where: { key_userId: { key, userId } },
            update: { value },
            create: { key, userId, value },
        });
    }

    async getState(key: string, userId: string) {
        return this.prisma.stateTable.findUnique({
            where: { key_userId: { key, userId } },
        });
    }

    async listState() {
        return this.prisma.stateTable.findMany();
    }

    async deleteState(key: string, userId: string) {
        return this.prisma.stateTable.delete({
            where: { key_userId: { key, userId } },
        });
    }
    async deleteStateById(id: string) {
        return this.prisma.stateTable.delete({
            where: { id },
        });
    }
}
