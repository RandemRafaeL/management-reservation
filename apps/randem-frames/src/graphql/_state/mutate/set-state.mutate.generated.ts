import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SetStateMutationVariables = Types.Exact<{
  input: Types.StateInput;
}>;


export type SetStateMutation = { setState: { id: string, key: string, userId: string, value: any } };

export const SetStateDocument = gql`
    mutation SetState($input: StateInput!) {
  setState(input: $input) {
    id
    key
    userId
    value
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SetStateGQL extends Apollo.Mutation<SetStateMutation, SetStateMutationVariables> {
    override document = SetStateDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }