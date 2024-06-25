import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from './modules/user/user.service';
import { TokenPayloadReqUser } from './modules/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true, // W produkcji powinno być ustawione na false
            secretOrKey: 'secretKey', // Klucz używany do podpisania JWT, powinien być taki sam jak w module JwtModule
        });
    }

    async validate(payload: TokenPayloadReqUser) {
        return await this.userService.findOneById(payload.userId);
    }
}
