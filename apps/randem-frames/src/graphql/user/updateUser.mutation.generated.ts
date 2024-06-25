import * as Types from '../_generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type UpdateUserMutationVariables = Types.Exact<{
  updateUserId: Types.Scalars['String']['input'];
  updateUserInput: Types.UpdateUserInput;
}>;


export type UpdateUserMutation = { updateUser: { id: string, role: Types.UserRoleEnum, username: string } };

export const UpdateUserDocument = gql`
    mutation UpdateUser($updateUserId: String!, $updateUserInput: UpdateUserInput!) {
  updateUser(id: $updateUserId, updateUserInput: $updateUserInput) {
    id
    role
    username
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateUserGQL extends Apollo.Mutation<UpdateUserMutation, UpdateUserMutationVariables> {
    override document = UpdateUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }