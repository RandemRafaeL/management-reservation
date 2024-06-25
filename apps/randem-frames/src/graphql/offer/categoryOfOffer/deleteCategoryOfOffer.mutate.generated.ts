import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DeleteCategoryOfOfferMutationVariables = Types.Exact<{
  deleteCategoryOfOfferId: Types.Scalars['String']['input'];
}>;


export type DeleteCategoryOfOfferMutation = { deleteCategoryOfOffer: { id: string, imageUrl?: string | null, name: string } };

export const DeleteCategoryOfOfferDocument = gql`
    mutation DeleteCategoryOfOffer($deleteCategoryOfOfferId: String!) {
  deleteCategoryOfOffer(id: $deleteCategoryOfOfferId) {
    id
    imageUrl
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteCategoryOfOfferGQL extends Apollo.Mutation<DeleteCategoryOfOfferMutation, DeleteCategoryOfOfferMutationVariables> {
    override document = DeleteCategoryOfOfferDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }