import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCategoryOfOfferInput } from './create-categoryOfOffer.input';

@InputType()
export class UpdateCategoryOfOfferInput extends PartialType(CreateCategoryOfOfferInput) {}
