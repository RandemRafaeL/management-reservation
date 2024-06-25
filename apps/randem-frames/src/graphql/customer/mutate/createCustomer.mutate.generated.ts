import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { FullCustomerFragmentDoc } from '../fragment/fullCustomer.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type CreateCustomerMutationVariables = Types.Exact<{
  createCustomerInput: Types.CreateCustomerInput;
}>;


export type CreateCustomerMutation = { createCustomer: { id: string, name: string, email: string, phone?: string | null, bookings?: Array<{ offerForCompany?: { offer?: { name: string } | null } | null, offerForEmployee?: { offerForCompany?: { offer?: { name: string } | null } | null } | null } | null> | null } };

export const CreateCustomerDocument = gql`
    mutation CreateCustomer($createCustomerInput: CreateCustomerInput!) {
  createCustomer(createCustomerInput: $createCustomerInput) {
    ...FullCustomer
  }
}
    ${FullCustomerFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateCustomerGQL extends Apollo.Mutation<CreateCustomerMutation, CreateCustomerMutationVariables> {
    override document = CreateCustomerDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }