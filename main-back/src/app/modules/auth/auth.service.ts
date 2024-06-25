import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthTokenType, LoginUserInput } from './dto/login-user.input';
import { UserTable, UserRoleEnum } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService, // Użyj PrismaService
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<UserTable | null> {
        const user = await this.prisma.userTable.findUnique({
            where: { username },
        });

        if (user && bcrypt.compareSync(password, user.password)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            return user;
        }
        return null;
    }

    async login(loginUserInput: LoginUserInput): Promise<AuthTokenType> {
        const user = await this.validateUser(loginUserInput.username, loginUserInput.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload: TokenPayloadReqUser = { username: user.username, userId: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}

export type TokenPayloadReqUser = {
    username: string;
    userId: string;
    role: UserRoleEnum;
};
