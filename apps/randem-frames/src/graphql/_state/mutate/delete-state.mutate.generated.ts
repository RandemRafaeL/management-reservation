import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DeleteStateMutationVariables = Types.Exact<{
  key: Types.Scalars['String']['input'];
  userId?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type DeleteStateMutation = { deleteState?: { id: string } | null };

export const DeleteStateDocument = gql`
    mutation DeleteState($key: String!, $userId: String) {
  deleteState(key: $key, userId: $userId) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteStateGQL extends Apollo.Mutation<DeleteStateMutation, DeleteStateMutationVariables> {
    override document = DeleteStateDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }