import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { DetailFullOfferForCompanyFragmentDoc } from '../fragment/detailFullOfferForCompany.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type ListOfferForCompanyQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ListOfferForCompanyQuery = { listOffersForCompany: Array<{ id: string, customName?: string | null, customDescription?: string | null, customImageUrl?: string | null, duration: string, price: number, availability: boolean, company?: { id: string, name: string, imageId?: string | null, imageUrl?: string | null } | null, offer?: { id: string, name: string, imageUrl: string, category?: { id: string, name: string, imageUrl?: string | null } | null } | null }> };

export const ListOfferForCompanyDocument = gql`
    query ListOfferForCompany {
  listOffersForCompany {
    ...DetailFullOfferForCompany
  }
}
    ${DetailFullOfferForCompanyFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ListOfferForCompanyGQL extends Apollo.Query<ListOfferForCompanyQuery, ListOfferForCompanyQueryVariables> {
    override document = ListOfferForCompanyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }