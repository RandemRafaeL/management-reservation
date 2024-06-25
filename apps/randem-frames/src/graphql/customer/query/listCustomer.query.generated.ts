import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { FullCustomerFragmentDoc } from '../fragment/fullCustomer.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type ListCustomerQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ListCustomerQuery = { listCustomer: Array<{ id: string, name: string, email: string, phone?: string | null, bookings?: Array<{ offerForCompany?: { offer?: { name: string } | null } | null, offerForEmployee?: { offerForCompany?: { offer?: { name: string } | null } | null } | null } | null> | null }> };

export const ListCustomerDocument = gql`
    query ListCustomer {
  listCustomer {
    ...FullCustomer
  }
}
    ${FullCustomerFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ListCustomerGQL extends Apollo.Query<ListCustomerQuery, ListCustomerQueryVariables> {
    override document = ListCustomerDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }