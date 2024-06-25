import { InputType, PartialType } from '@nestjs/graphql';
import { CreateOfferForCompanyInput } from './create-offerForCompany.input';

@InputType()
export class UpdateOfferForCompanyInput extends PartialType(CreateOfferForCompanyInput) {}
