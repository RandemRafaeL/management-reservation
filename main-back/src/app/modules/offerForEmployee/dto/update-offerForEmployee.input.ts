import { InputType, PartialType } from '@nestjs/graphql';
import { CreateOfferForEmployeeInput } from './create-offerForEmployee.input';

@InputType()
export class UpdateOfferForEmployeeInput extends PartialType(CreateOfferForEmployeeInput) {}
