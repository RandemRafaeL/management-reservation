import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service'; // Import serwisu Prisma
import { UserRoleEnum } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
    constructor(private prismaService: PrismaService) {
        // Użyj PrismaService zamiast UserService
        this.createInitialAdminUser().then();
    }

    private async createInitialAdminUser(): Promise<void> {
        // Sprawdź, czy istnieje już konto admina
        const adminExists = await this.prismaService.userTable.findUnique({
            where: {
                username: 'admin',
            },
        });
        if (!adminExists) {
            const salt = bcrypt.genSaltSync();
            const hashedPassword = bcrypt.hashSync('admin', salt); // Hashowanie hasła
            // Utwórz konto admina

            await this.prismaService.userTable.create({
                data: {
                    username: 'admin',
                    password: hashedPassword, // Pamiętaj o zahashowaniu hasła w prawdziwej aplikacji
                    role: UserRoleEnum.ADMIN,
                    // inne wymagane dane
                },
            });
        }
    }
}
