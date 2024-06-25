import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type UpdateCategoryOfOfferMutationVariables = Types.Exact<{
  updateCategoryOfOfferId: Types.Scalars['String']['input'];
  input: Types.UpdateCategoryOfOfferInput;
}>;


export type UpdateCategoryOfOfferMutation = { updateCategoryOfOffer: { id: string, imageUrl?: string | null, name: string } };

export const UpdateCategoryOfOfferDocument = gql`
    mutation UpdateCategoryOfOffer($updateCategoryOfOfferId: String!, $input: UpdateCategoryOfOfferInput!) {
  updateCategoryOfOffer(id: $updateCategoryOfOfferId, input: $input) {
    id
    imageUrl
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateCategoryOfOfferGQL extends Apollo.Mutation<UpdateCategoryOfOfferMutation, UpdateCategoryOfOfferMutationVariables> {
    override document = UpdateCategoryOfOfferDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }