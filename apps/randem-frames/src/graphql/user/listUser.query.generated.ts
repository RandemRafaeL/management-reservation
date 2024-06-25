import * as Types from '../_generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type ListUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ListUserQuery = { listUsers: Array<{ id: string, role: Types.UserRoleEnum, username: string }> };

export const ListUserDocument = gql`
    query listUser {
  listUsers {
    id
    role
    username
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ListUserGQL extends Apollo.Query<ListUserQuery, ListUserQueryVariables> {
    override document = ListUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }