import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { DetailFullOfferFragmentDoc } from '../fragment/detailFullOffer.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetAllOffersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllOffersQuery = { getAllOffers: Array<{ id: string, name: string, description?: string | null, imageUrl: string, category?: { id: string, name: string, imageUrl?: string | null } | null }> };

export const GetAllOffersDocument = gql`
    query GetAllOffers {
  getAllOffers {
    ...DetailFullOffer
  }
}
    ${DetailFullOfferFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllOffersGQL extends Apollo.Query<GetAllOffersQuery, GetAllOffersQueryVariables> {
    override document = GetAllOffersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }