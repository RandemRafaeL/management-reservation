import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
    @Field()
    username: string;

    @Field()
    password: string;
}

@ObjectType()
export class AuthTokenType {
    @Field()
    access_token: string;
}
