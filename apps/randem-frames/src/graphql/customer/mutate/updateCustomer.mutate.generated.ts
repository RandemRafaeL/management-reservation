import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { FullCustomerFragmentDoc } from '../fragment/fullCustomer.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type UpdateCustomerMutationVariables = Types.Exact<{
  updateCustomerId: Types.Scalars['String']['input'];
  updateCustomerInput: Types.UpdateCustomerInput;
}>;


export type UpdateCustomerMutation = { updateCustomer: { id: string, name: string, email: string, phone?: string | null, bookings?: Array<{ offerForCompany?: { offer?: { name: string } | null } | null, offerForEmployee?: { offerForCompany?: { offer?: { name: string } | null } | null } | null } | null> | null } };

export const UpdateCustomerDocument = gql`
    mutation UpdateCustomer($updateCustomerId: String!, $updateCustomerInput: UpdateCustomerInput!) {
  updateCustomer(id: $updateCustomerId, updateCustomerInput: $updateCustomerInput) {
    ...FullCustomer
  }
}
    ${FullCustomerFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateCustomerGQL extends Apollo.Mutation<UpdateCustomerMutation, UpdateCustomerMutationVariables> {
    override document = UpdateCustomerDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }