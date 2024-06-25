import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { DetailFullOfferForEmployeeFragmentDoc } from '../fragment/detailFullOfferForEmployee.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type CreateOfferForEmployeeMutationVariables = Types.Exact<{
  createOfferForEmployeeInput: Types.CreateOfferForEmployeeInput;
}>;


export type CreateOfferForEmployeeMutation = { createOfferForEmployee: { id: string, employee?: { id: string, imageUrl?: string | null, email: string, firstName: string, isActive: boolean, lastName: string, phoneNumber?: string | null, position: string, company?: { id: string, name: string } | null } | null, offerForCompany?: { id: string, customName?: string | null, customDescription?: string | null, customImageUrl?: string | null, duration: string, price: number, availability: boolean, company?: { id: string, name: string, imageId?: string | null, imageUrl?: string | null } | null, offer?: { id: string, name: string, imageUrl: string, category?: { id: string, name: string, imageUrl?: string | null } | null } | null } | null, booking?: { id?: string | null } | null } };

export const CreateOfferForEmployeeDocument = gql`
    mutation CreateOfferForEmployee($createOfferForEmployeeInput: CreateOfferForEmployeeInput!) {
  createOfferForEmployee(
    createOfferForEmployeeInput: $createOfferForEmployeeInput
  ) {
    ...DetailFullOfferForEmployee
  }
}
    ${DetailFullOfferForEmployeeFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateOfferForEmployeeGQL extends Apollo.Mutation<CreateOfferForEmployeeMutation, CreateOfferForEmployeeMutationVariables> {
    override document = CreateOfferForEmployeeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }