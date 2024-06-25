import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { DetailFullOfferForEmployeeFragmentDoc } from '../fragment/detailFullOfferForEmployee.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetOfferForEmployeeQueryVariables = Types.Exact<{
  getOfferForEmployeeId: Types.Scalars['String']['input'];
}>;


export type GetOfferForEmployeeQuery = { getOfferForEmployee: { id: string, employee?: { id: string, imageUrl?: string | null, email: string, firstName: string, isActive: boolean, lastName: string, phoneNumber?: string | null, position: string, company?: { id: string, name: string } | null } | null, offerForCompany?: { id: string, customName?: string | null, customDescription?: string | null, customImageUrl?: string | null, duration: string, price: number, availability: boolean, company?: { id: string, name: string, imageId?: string | null, imageUrl?: string | null } | null, offer?: { id: string, name: string, imageUrl: string, category?: { id: string, name: string, imageUrl?: string | null } | null } | null } | null, booking?: { id?: string | null } | null } };

export const GetOfferForEmployeeDocument = gql`
    query GetOfferForEmployee($getOfferForEmployeeId: String!) {
  getOfferForEmployee(id: $getOfferForEmployeeId) {
    ...DetailFullOfferForEmployee
  }
}
    ${DetailFullOfferForEmployeeFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetOfferForEmployeeGQL extends Apollo.Query<GetOfferForEmployeeQuery, GetOfferForEmployeeQueryVariables> {
    override document = GetOfferForEmployeeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }