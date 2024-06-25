import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { DetailFullOfferForEmployeeFragmentDoc } from '../fragment/detailFullOfferForEmployee.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type UpdateOfferForEmployeeMutationVariables = Types.Exact<{
  updateOfferForEmployeeId: Types.Scalars['String']['input'];
  updateOfferForEmployeeInput: Types.UpdateOfferForEmployeeInput;
}>;


export type UpdateOfferForEmployeeMutation = { updateOfferForEmployee: { id: string, employee?: { id: string, imageUrl?: string | null, email: string, firstName: string, isActive: boolean, lastName: string, phoneNumber?: string | null, position: string, company?: { id: string, name: string } | null } | null, offerForCompany?: { id: string, customName?: string | null, customDescription?: string | null, customImageUrl?: string | null, duration: string, price: number, availability: boolean, company?: { id: string, name: string, imageId?: string | null, imageUrl?: string | null } | null, offer?: { id: string, name: string, imageUrl: string, category?: { id: string, name: string, imageUrl?: string | null } | null } | null } | null, booking?: { id?: string | null } | null } };

export const UpdateOfferForEmployeeDocument = gql`
    mutation UpdateOfferForEmployee($updateOfferForEmployeeId: String!, $updateOfferForEmployeeInput: UpdateOfferForEmployeeInput!) {
  updateOfferForEmployee(
    id: $updateOfferForEmployeeId
    updateOfferForEmployeeInput: $updateOfferForEmployeeInput
  ) {
    ...DetailFullOfferForEmployee
  }
}
    ${DetailFullOfferForEmployeeFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateOfferForEmployeeGQL extends Apollo.Mutation<UpdateOfferForEmployeeMutation, UpdateOfferForEmployeeMutationVariables> {
    override document = UpdateOfferForEmployeeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }