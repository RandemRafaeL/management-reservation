import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { LoginUserInput, AuthTokenType } from '../dto/login-user.input';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Mutation(() => AuthTokenType)
    async login(@Args('loginUserData') loginUserInput: LoginUserInput): Promise<AuthTokenType> {
        const user = await this.authService.login(loginUserInput);
        return { access_token: user.access_token };
    }
}
