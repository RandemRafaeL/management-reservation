import * as Types from '../_generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetUserQueryVariables = Types.Exact<{
  userId: Types.Scalars['String']['input'];
}>;


export type GetUserQuery = { getUser?: { id: string, username: string, role: Types.UserRoleEnum } | null };

export const GetUserDocument = gql`
    query getUser($userId: String!) {
  getUser(id: $userId) {
    id
    username
    role
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetUserGQL extends Apollo.Query<GetUserQuery, GetUserQueryVariables> {
    override document = GetUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }