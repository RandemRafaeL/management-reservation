import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { DetailFullOfferForCompanyFragmentDoc } from '../fragment/detailFullOfferForCompany.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetOfferForCompanyQueryVariables = Types.Exact<{
  getOfferForCompanyId: Types.Scalars['String']['input'];
}>;


export type GetOfferForCompanyQuery = { getOfferForCompany?: { id: string, customName?: string | null, customDescription?: string | null, customImageUrl?: string | null, duration: string, price: number, availability: boolean, company?: { id: string, name: string, imageId?: string | null, imageUrl?: string | null } | null, offer?: { id: string, name: string, imageUrl: string, category?: { id: string, name: string, imageUrl?: string | null } | null } | null } | null };

export const GetOfferForCompanyDocument = gql`
    query GetOfferForCompany($getOfferForCompanyId: String!) {
  getOfferForCompany(id: $getOfferForCompanyId) {
    ...DetailFullOfferForCompany
  }
}
    ${DetailFullOfferForCompanyFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetOfferForCompanyGQL extends Apollo.Query<GetOfferForCompanyQuery, GetOfferForCompanyQueryVariables> {
    override document = GetOfferForCompanyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }