import { Field, ID, InputType, PartialType, OmitType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';
import { UserRoleEnum } from '@prisma/client';

@InputType()
class _UserBaseDto {
    @Field(() => ID, { nullable: true })
    @IsUUID()
    @IsOptional()
    id?: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    username: string;

    @Field(() => UserRoleEnum)
    @IsEnum(UserRoleEnum)
    role: UserRoleEnum;

    @Field()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}

// DTO dla tworzenia użytkownika
@InputType()
export class _CreateUserInput extends OmitType(_UserBaseDto, ['id'] as const) {
    // Tutaj używamy OmitType, aby pominąć pole 'id', które nie jest potrzebne przy tworzeniu
}

// DTO dla aktualizacji użytkownika
@InputType()
export class _UpdateUserInput extends PartialType(OmitType(_UserBaseDto, ['id'] as const)) {
    // Tutaj używamy PartialType w połączeniu z OmitType, aby wszystkie pola oprócz 'id' były opcjonalne
}
