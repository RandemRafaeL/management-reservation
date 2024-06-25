import { PartialType } from '@nestjs/graphql';

import { CreateImageInput } from './create-image.input';

import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateImageInput extends PartialType(CreateImageInput) {}
