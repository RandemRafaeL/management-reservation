import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { DetailFullOfferFragmentDoc } from '../fragment/detailFullOffer.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetAllOffersExtendQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.QueryOptionsInput>;
}>;


export type GetAllOffersExtendQuery = { getAllOffers: Array<{ id: string, name: string, description?: string | null, imageUrl: string, category?: { id: string, name: string, imageUrl?: string | null } | null }> };

export const GetAllOffersExtendDocument = gql`
    query GetAllOffersExtend($options: QueryOptionsInput) {
  getAllOffers(options: $options) {
    ...DetailFullOffer
  }
}
    ${DetailFullOfferFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllOffersExtendGQL extends Apollo.Query<GetAllOffersExtendQuery, GetAllOffersExtendQueryVariables> {
    override document = GetAllOffersExtendDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }