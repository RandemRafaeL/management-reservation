import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local-strategy';
import { PrismaService } from '../../prisma.service';
import { AuthResolver } from './resolvers/auth.resolver';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'secretKey', // Użyj bardziej bezpiecznego klucza w produkcji
            signOptions: { expiresIn: '6000s' },
        }),
    ],
    providers: [AuthService, LocalStrategy, PrismaService, AuthResolver],
    controllers: [],
})
export class AuthModule {}
