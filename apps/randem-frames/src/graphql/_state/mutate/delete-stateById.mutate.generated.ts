import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DeleteStateByIdMutationVariables = Types.Exact<{
  deleteStateId: Types.Scalars['String']['input'];
}>;


export type DeleteStateByIdMutation = { deleteStateById?: { id: string } | null };

export const DeleteStateByIdDocument = gql`
    mutation DeleteStateById($deleteStateId: String!) {
  deleteStateById(id: $deleteStateId) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteStateByIdGQL extends Apollo.Mutation<DeleteStateByIdMutation, DeleteStateByIdMutationVariables> {
    override document = DeleteStateByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }