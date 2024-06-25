import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetStateQueryVariables = Types.Exact<{
  key: Types.Scalars['String']['input'];
  userId?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetStateQuery = { getState?: { id: string, key: string, userId: string, value: any } | null };

export const GetStateDocument = gql`
    query GetState($key: String!, $userId: String) {
  getState(key: $key, userId: $userId) {
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
  export class GetStateGQL extends Apollo.Query<GetStateQuery, GetStateQueryVariables> {
    override document = GetStateDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }