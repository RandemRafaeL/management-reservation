import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { DetailFullOfferFragmentDoc } from '../fragment/detailFullOffer.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type UpdateOfferMutationVariables = Types.Exact<{
  updateOfferId: Types.Scalars['String']['input'];
  updateOfferInput: Types.UpdateOfferInput;
}>;


export type UpdateOfferMutation = { updateOffer: { id: string, name: string, description?: string | null, imageUrl: string, category?: { id: string, name: string, imageUrl?: string | null } | null } };

export const UpdateOfferDocument = gql`
    mutation UpdateOffer($updateOfferId: String!, $updateOfferInput: UpdateOfferInput!) {
  updateOffer(id: $updateOfferId, updateOfferInput: $updateOfferInput) {
    ...DetailFullOffer
  }
}
    ${DetailFullOfferFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateOfferGQL extends Apollo.Mutation<UpdateOfferMutation, UpdateOfferMutationVariables> {
    override document = UpdateOfferDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }