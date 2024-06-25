import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { DetailFullOfferForEmployeeFragmentDoc } from '../fragment/detailFullOfferForEmployee.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type ListOfferForEmployeesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ListOfferForEmployeesQuery = { listOfferForEmployees: Array<{ id: string, employee?: { id: string, imageUrl?: string | null, email: string, firstName: string, isActive: boolean, lastName: string, phoneNumber?: string | null, position: string, company?: { id: string, name: string } | null } | null, offerForCompany?: { id: string, customName?: string | null, customDescription?: string | null, customImageUrl?: string | null, duration: string, price: number, availability: boolean, company?: { id: string, name: string, imageId?: string | null, imageUrl?: string | null } | null, offer?: { id: string, name: string, imageUrl: string, category?: { id: string, name: string, imageUrl?: string | null } | null } | null } | null, booking?: { id?: string | null } | null }> };

export const ListOfferForEmployeesDocument = gql`
    query ListOfferForEmployees {
  listOfferForEmployees {
    ...DetailFullOfferForEmployee
  }
}
    ${DetailFullOfferForEmployeeFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ListOfferForEmployeesGQL extends Apollo.Query<ListOfferForEmployeesQuery, ListOfferForEmployeesQueryVariables> {
    override document = ListOfferForEmployeesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }