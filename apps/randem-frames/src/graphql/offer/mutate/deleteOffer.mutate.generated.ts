import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { DetailFullOfferFragmentDoc } from '../fragment/detailFullOffer.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DeleteOfferMutationVariables = Types.Exact<{
  deleteOfferId: Types.Scalars['String']['input'];
}>;


export type DeleteOfferMutation = { deleteOffer: { id: string, name: string, description?: string | null, imageUrl: string, category?: { id: string, name: string, imageUrl?: string | null } | null } };

export const DeleteOfferDocument = gql`
    mutation DeleteOffer($deleteOfferId: String!) {
  deleteOffer(id: $deleteOfferId) {
    ...DetailFullOffer
  }
}
    ${DetailFullOfferFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteOfferGQL extends Apollo.Mutation<DeleteOfferMutation, DeleteOfferMutationVariables> {
    override document = DeleteOfferDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }