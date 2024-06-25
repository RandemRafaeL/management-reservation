import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { FullCustomerFragmentDoc } from '../fragment/fullCustomer.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetCustomerQueryVariables = Types.Exact<{
  getCustomerId: Types.Scalars['String']['input'];
}>;


export type GetCustomerQuery = { getCustomer: { id: string, name: string, email: string, phone?: string | null, bookings?: Array<{ offerForCompany?: { offer?: { name: string } | null } | null, offerForEmployee?: { offerForCompany?: { offer?: { name: string } | null } | null } | null } | null> | null } };

export const GetCustomerDocument = gql`
    query GetCustomer($getCustomerId: String!) {
  getCustomer(id: $getCustomerId) {
    ...FullCustomer
  }
}
    ${FullCustomerFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCustomerGQL extends Apollo.Query<GetCustomerQuery, GetCustomerQueryVariables> {
    override document = GetCustomerDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }