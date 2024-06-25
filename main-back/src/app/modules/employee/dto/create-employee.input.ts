import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEmployeeInput {
    @Field({ nullable: true })
    imageUrl?: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    email: string;

    @Field()
    position: string;

    @Field()
    companyId: string; // Użyj ID firmy do określenia powiązania z firmą użytkownika

    @Field(() => Boolean, { defaultValue: true })
    isActive?: boolean; // Domyślnie ustawione na true

    @Field(() => String, { nullable: true })
    phoneNumber?: string;
}
