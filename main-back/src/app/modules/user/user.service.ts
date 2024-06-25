import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import * as bcrypt from 'bcrypt';
import { UserType } from './entities/user.type';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
    constructor(
        private prismaService: PrismaService // Użyj PrismaService
    ) {}

    async findAll(): Promise<UserType[]> {
        return this.prismaService.userTable.findMany({
            include: {
                company: {
                    include: {
                        user: true,
                    },
                },
            },
        });
    }

    async findByUsername(username: string): Promise<UserType | null> {
        return this.prismaService.userTable.findUnique({ where: { username } });
    }

    async findOneFullUser(username: string): Promise<UserType | null> {
        return this.prismaService.userTable.findUnique({
            where: { username },
            include: { company: true },
        });
    }

    async findOneById(id: string): Promise<Omit<UserType, 'password'> | null> {
        return this.prismaService.userTable.findUnique({
            where: { id },
            select: { id: true, username: true, role: true },
        });
    }

    async create(createUserInput: CreateUserInput): Promise<UserType> {
        const hashedPassword = await bcrypt.hash(createUserInput.password, 10);

        return this.prismaService.userTable.create({
            data: {
                ...createUserInput,
                password: hashedPassword,
                //     company: {
                //         create: createUserInput.company || [],
                //     },
            },
        });
    }

    async update(id: string, updateUserInput: UpdateUserInput) {
        const hashedPassword = await bcrypt.hash(updateUserInput.password, 10);
        return this.prismaService.userTable.update({
            where: { id },
            data: {
                ...updateUserInput,
                password: hashedPassword,
            },
        });
    }

    async delete(id: string) {
        return this.prismaService.userTable.delete({
            where: { id },
        });
    }

    async isUniqueUsername(username: string, id?: string | null) {
        const user = await this.prismaService.userTable.findUnique({
            where: {
                username: username,
                ...(id ? { NOT: { id } } : {}),
            },
            select: {
                username: true,
            },
        });
        return !user;
    }
}
