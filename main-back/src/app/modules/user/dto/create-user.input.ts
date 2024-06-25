import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsString, IsStrongPassword, MinLength } from 'class-validator';
import { UserRoleEnum } from '@prisma/client';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

@InputType()
export class CreateUserInput {
    @Field()
    @IsString()
    @IsEmail()
    username: string;

    @Field()
    @IsString()
    @MinLength(6)
    // @IsStrongPassword()
    password: string;

    @Field(() => UserRoleEnum)
    @IsEnum(UserRoleEnum)
    role: UserRoleEnum;
}

export const schema_UserBaseDto = validationMetadatasToSchemas();
