import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { DetailFullOfferFragmentDoc } from '../fragment/detailFullOffer.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type CreateOfferMutationVariables = Types.Exact<{
  createOfferInput: Types.CreateOfferInput;
}>;


export type CreateOfferMutation = { createOffer: { id: string, name: string, description?: string | null, imageUrl: string, category?: { id: string, name: string, imageUrl?: string | null } | null } };

export const CreateOfferDocument = gql`
    mutation CreateOffer($createOfferInput: CreateOfferInput!) {
  createOffer(createOfferInput: $createOfferInput) {
    ...DetailFullOffer
  }
}
    ${DetailFullOfferFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateOfferGQL extends Apollo.Mutation<CreateOfferMutation, CreateOfferMutationVariables> {
    override document = CreateOfferDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }