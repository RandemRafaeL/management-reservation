import * as Types from '../_generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type UniqueUsernameQueryVariables = Types.Exact<{
  username: Types.Scalars['String']['input'];
  userId?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type UniqueUsernameQuery = { uniqueUsername: boolean };

export const UniqueUsernameDocument = gql`
    query UniqueUsername($username: String!, $userId: String) {
  uniqueUsername(username: $username, userId: $userId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UniqueUsernameGQL extends Apollo.Query<UniqueUsernameQuery, UniqueUsernameQueryVariables> {
    override document = UniqueUsernameDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }