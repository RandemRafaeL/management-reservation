import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOfferForEmployeeInput {
    @Field(() => ID)
    offerForCompanyId: string; // Klucz obcy do OfferForCompany

    @Field(() => ID)
    employeeId: string; // Klucz obcy do Employee

    // w przyszłości dodatkowe pola, gdy oferta poszczególnych pracowników różni sie od oferty firmowej
}
