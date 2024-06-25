import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type CreateCategoryOfOfferMutationVariables = Types.Exact<{
  input: Types.CreateCategoryOfOfferInput;
}>;


export type CreateCategoryOfOfferMutation = { createCategoryOfOffer: { id: string, imageUrl?: string | null, name: string } };

export const CreateCategoryOfOfferDocument = gql`
    mutation CreateCategoryOfOffer($input: CreateCategoryOfOfferInput!) {
  createCategoryOfOffer(input: $input) {
    id
    imageUrl
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateCategoryOfOfferGQL extends Apollo.Mutation<CreateCategoryOfOfferMutation, CreateCategoryOfOfferMutationVariables> {
    override document = CreateCategoryOfOfferDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }