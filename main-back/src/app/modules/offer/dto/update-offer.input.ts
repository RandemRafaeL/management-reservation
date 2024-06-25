import { InputType, PartialType } from '@nestjs/graphql';
import { CreateOfferInput } from './create-offer.input';

@InputType()
export class UpdateOfferInput extends PartialType(CreateOfferInput) {}
