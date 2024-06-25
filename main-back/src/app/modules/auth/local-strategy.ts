import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'username', // Nazwa pola dla nazwy użytkownika
            passwordField: 'password', // Nazwa pola dla hasła
        });
    }

    async validate(username: string, password: string) {
        console.log('LocalStrategy: Password provided:', password); // Tymczasowe logowanie

        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
