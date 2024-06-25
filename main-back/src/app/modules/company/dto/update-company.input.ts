// import { PartialType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/graphql';

import { CreateCompanyInput } from './create-company.input';
import { InputType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {}

@InputType()
export class UpdateCompanyForUserInput extends OmitType(UpdateCompanyInput, ['userId'] as const) {}
