import * as Types from '../_generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetUserByNameQueryVariables = Types.Exact<{
  username: Types.Scalars['String']['input'];
}>;


export type GetUserByNameQuery = { getUserByName?: { id: string, username: string, role: Types.UserRoleEnum } | null };

export const GetUserByNameDocument = gql`
    query getUserByName($username: String!) {
  getUserByName(username: $username) {
    id
    username
    role
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetUserByNameGQL extends Apollo.Query<GetUserByNameQuery, GetUserByNameQueryVariables> {
    override document = GetUserByNameDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }